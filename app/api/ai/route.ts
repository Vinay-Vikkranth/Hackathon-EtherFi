import { NextRequest, NextResponse } from 'next/server';

// Ollama API endpoint (default is http://localhost:11434)
const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434/api/generate';
// Model to use (you can change this to 'llama2', 'mistral', 'codellama', etc.)
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2';

export async function POST(request: NextRequest) {
  try {
    const { message, userContext, protocolData } = await request.json();

    // Build context for AI
    const contextPrompt = `You are an AI assistant for ether.fi, a non-custodial Ethereum staking platform.

REAL-TIME PROTOCOL DATA:
- Total Value Locked (TVL): $${protocolData?.tvl ? (protocolData.tvl / 1e9).toFixed(2) + 'B' : 'N/A'}
- 24h Fees: $${protocolData?.metrics?.fees24h ? (protocolData.metrics.fees24h / 1e6).toFixed(2) + 'M' : 'N/A'}
- 24h Revenue: $${protocolData?.metrics?.revenue24h ? (protocolData.metrics.revenue24h / 1e6).toFixed(2) + 'M' : 'N/A'}
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

    const fullPrompt = `${contextPrompt}\n\nUser Question: ${message}\n\nAssistant:`;

    // Call Ollama API
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
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({
      response: data.response || 'I apologize, but I could not generate a response. Please make sure Ollama is running.',
    });
  } catch (error: any) {
    console.error('AI API Error:', error);
    
    // Fallback response if Ollama is not running
    return NextResponse.json(
      {
        response: `I'm having trouble connecting to the AI service. Please make sure Ollama is running on your machine.\n\nTo start Ollama:\n1. Install Ollama from https://ollama.ai\n2. Run: ollama pull ${OLLAMA_MODEL}\n3. Make sure Ollama is running (default: http://localhost:11434)\n\nError: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

