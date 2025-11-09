import { NextRequest, NextResponse } from 'next/server';

// Ollama API endpoint (default is http://localhost:11434)
const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434/api/generate';
// Model to use (you can change this to 'llama2', 'mistral', 'codellama', etc.)
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2';

// Rate limiting - simple in-memory store (use Redis in production)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

// Input validation
const MAX_MESSAGE_LENGTH = 1000;
const ALLOWED_OLLAMA_HOSTS = ['localhost', '127.0.0.1'];

function validateOllamaUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_OLLAMA_HOSTS.some(host => parsed.hostname === host);
  } catch {
    return false;
  }
}

function sanitizeInput(input: string): string {
  // Remove any potential HTML/script tags
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);
}

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(identifier);

  if (!record || now > record.resetTime) {
    requestCounts.set(identifier, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Validate Ollama URL
    if (!validateOllamaUrl(OLLAMA_API_URL)) {
      console.error('Invalid Ollama URL configuration');
      return NextResponse.json(
        { 
          response: 'AI service is not properly configured. Please contact support.',
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { message, userContext, protocolData } = body;

    // Validate message
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters.` },
        { status: 400 }
      );
    }

    // Sanitize user input
    const sanitizedMessage = sanitizeInput(message);

    if (!sanitizedMessage) {
      return NextResponse.json(
        { error: 'Invalid message content' },
        { status: 400 }
      );
    }

    // Safely parse numeric values
    const parseTvl = (val: any) => {
      if (typeof val === 'number') return val;
      if (typeof val === 'string') return parseFloat(val) || 0;
      return 0;
    };

    // Build context for AI
    const contextPrompt = `You are an AI assistant for ether.fi, a non-custodial Ethereum staking platform.

REAL-TIME PROTOCOL DATA:
- Total Value Locked (TVL): $${protocolData?.tvl ? (parseTvl(protocolData.tvl) / 1e9).toFixed(2) + 'B' : 'N/A'}
- 24h Fees: $${protocolData?.metrics?.fees24h ? (parseTvl(protocolData.metrics.fees24h) / 1e6).toFixed(2) + 'M' : 'N/A'}
- 24h Revenue: $${protocolData?.metrics?.revenue24h ? (parseTvl(protocolData.metrics.revenue24h) / 1e6).toFixed(2) + 'M' : 'N/A'}
- Current APY: ~3.8%

USER CONTEXT (DEMO):
- Staked ETH: ${userContext?.stakedETH || 10.5} ETH
- eETH Balance: ${userContext?.eETHBalance || 10.52} eETH
- Total Rewards: ${userContext?.totalRewards || 0.15} ETH
- Current APY: ${userContext?.apy || 3.8}%

YOUR CAPABILITIES:
1. Explain how ether.fi staking works
2. Calculate projected earnings based on staking amount and APY
3. Explain what eETH and weETH tokens are
4. Help users understand their staking rewards
5. Provide insights on staking strategies

WHEN USER ASKS ABOUT PROJECTIONS:
- Use the current APY (~3.8%) for calculations
- Calculate: (staking_amount * APY / 100) = annual_rewards
- Break down into monthly, weekly, daily earnings
- Consider compound interest if applicable
- Example: If user asks "How much could I earn if I stake 20 ETH?"
  - Annual: 20 * 0.038 = 0.76 ETH
  - Monthly: 0.76 / 12 = 0.063 ETH
  - Weekly: 0.76 / 52 = 0.015 ETH
  - Daily: 0.76 / 365 = 0.002 ETH

Be friendly, accurate, and educational. Always use the real protocol data when available. Keep responses concise and helpful.`;

    const fullPrompt = `${contextPrompt}\n\nUser Question: ${sanitizedMessage}\n\nAssistant:`;

    // Call Ollama API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: fullPrompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          num_predict: 500, // Limit response length
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Sanitize AI response
    const aiResponse = sanitizeInput(data.response || 'I apologize, but I could not generate a response.');

    return NextResponse.json({
      response: aiResponse,
    });
  } catch (error: any) {
    console.error('AI API Error:', error);
    
    // Don't expose internal error details
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { 
          response: 'The request took too long to process. Please try a shorter question.',
        },
        { status: 504 }
      );
    }

    // Fallback response if Ollama is not running
    return NextResponse.json(
      {
        response: `I'm having trouble connecting to the AI service. Please make sure Ollama is running on your machine.\n\nTo start Ollama:\n1. Install Ollama from https://ollama.ai\n2. Run: ollama pull ${OLLAMA_MODEL}\n3. Make sure Ollama is running (default: http://localhost:11434)`,
      },
      { status: 500 }
    );
  }
}

