'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const WELCOME_MESSAGE = "Hi there! I'm Finny, your friendly finance buddy! 👋\n\nI'm here to help you learn about staking, earning rewards, and using this app. What would you like to know?";

const SUGGESTED_QUESTIONS = [
  "What is liquid staking?",
  "How do I stake my ETH?",
  "What's the difference between eETH and weETH?",
  "How do I earn rewards?",
  "Is my money safe?",
];

export default function FinnyChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME_MESSAGE, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Listen for open-finny events with pre-filled questions
  useEffect(() => {
    const handleOpenFinny = (e: any) => {
      setIsOpen(true);
      if (e.detail) {
        setTimeout(() => handleSendMessage(e.detail), 300);
      }
    };
    
    window.addEventListener('open-finny', handleOpenFinny);
    return () => window.removeEventListener('open-finny', handleOpenFinny);
  }, []);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare conversation history for Claude
      const conversationHistory = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Call Claude API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationHistory })
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.message,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "Oops! I'm having trouble connecting right now. Can you try again? 🔄",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 group"
        >
          <MessageCircle className="w-7 h-7 text-white" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-dark-900 animate-pulse"></div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-dark-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat with Finny! 💬
          </div>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl shadow-2xl flex flex-col z-50 border-2 border-purple-500/30">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-white">Finny</h3>
                <p className="text-xs text-purple-100">Your Finance Buddy</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-dark-700 text-gray-100'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-dark-700 px-4 py-3 rounded-2xl flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                  <p className="text-sm text-gray-300">Finny is thinking...</p>
                </div>
              </div>
            )}

            {/* Suggested Questions (only show at start) */}
            {messages.length === 1 && !isLoading && (
              <div className="space-y-2 pt-2">
                <p className="text-xs text-gray-400 text-center">Quick questions:</p>
                {SUGGESTED_QUESTIONS.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="w-full text-left px-3 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg text-sm text-gray-300 transition-colors border border-purple-500/20"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Finny anything..."
                disabled={isLoading}
                className="flex-1 bg-dark-700 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Finny is here to help you learn! 🌟
            </p>
          </div>
        </div>
      )}
    </>
  );
}
