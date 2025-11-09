'use client';

import { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Lock, Coins } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export default function BeforeYouBeginModal({ onComplete }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const slides = [
    {
      icon: <Sparkles className="w-16 h-16 text-purple-400" />,
      title: "What is Ethereum Staking?",
      description: "Staking is like putting your ETH to work! Instead of sitting idle in your wallet, you lock it up to help secure the Ethereum network.",
      simple: "Think of it like a high-yield savings account for your crypto."
    },
    {
      icon: <TrendingUp className="w-16 h-16 text-green-400" />,
      title: "How Do You Earn Rewards?",
      description: "When you stake ETH, validators use it to verify transactions on the Ethereum blockchain. In return, you earn rewards - currently around 3-6% APR!",
      simple: "Your ETH works 24/7 earning you passive income."
    },
    {
      icon: <Lock className="w-16 h-16 text-yellow-400" />,
      title: "What is Liquid Staking?",
      description: "Traditional staking locks your ETH. Liquid staking gives you eETH tokens representing your staked ETH - so you can use them in DeFi while still earning rewards!",
      simple: "Get the best of both worlds: earn staking rewards AND use your assets."
    },
    {
      icon: <Coins className="w-16 h-16 text-blue-400" />,
      title: "Why This Demo?",
      description: "This is a safe, educational environment using testnet tokens (fake money). Experiment freely, learn the mechanics, and gain confidence before using real funds!",
      simple: "Learn risk-free, then take your knowledge to the real world."
    }
  ];

  const slide = slides[currentSlide];

  useEffect(() => {
    const duration = 30000; // 30 seconds total
    const interval = 100;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
            return 0;
          } else {
            clearInterval(timer);
            return 100;
          }
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setProgress(0);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="relative max-w-2xl w-full mx-4">
        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="absolute top-0 right-0 text-gray-400 hover:text-white transition-colors"
        >
          Skip intro →
        </button>

        {/* Main card */}
        <div className="bg-gradient-to-br from-dark-800 to-dark-900 border-2 border-purple-500/30 rounded-2xl p-8 shadow-2xl">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            {slide.icon}
          </div>

          {/* Content */}
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            {slide.title}
          </h2>
          <p className="text-gray-300 text-center mb-3 text-lg leading-relaxed">
            {slide.description}
          </p>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 mb-6">
            <p className="text-purple-300 text-center text-sm">
              💡 <strong>In Simple Terms:</strong> {slide.simple}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Slide {currentSlide + 1} of {slides.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mb-6">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'w-8 bg-purple-500' 
                    : index < currentSlide
                    ? 'w-2 bg-purple-500/50'
                    : 'w-2 bg-gray-600'
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            {currentSlide > 0 && (
              <button
                onClick={() => {
                  setCurrentSlide(currentSlide - 1);
                  setProgress(0);
                }}
                className="flex-1 px-6 py-3 bg-dark-700 hover:bg-dark-600 text-white rounded-xl font-semibold transition-all"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/50"
            >
              {currentSlide === slides.length - 1 ? "Let's Start Learning! 🚀" : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
