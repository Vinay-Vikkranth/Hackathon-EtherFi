'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  targetElement: string; // CSS selector for the element to highlight
  position: 'top' | 'bottom' | 'left' | 'right';
  arrow: 'top' | 'bottom' | 'left' | 'right';
}

// Tutorial for eETH Staking tab
const stakingTutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Liquid Staking! 👋',
    description: 'This tutorial will teach you how to stake your ETH and earn rewards. It only takes 2 minutes!',
    targetElement: '.tutorial-welcome',
    position: 'bottom',
    arrow: 'top'
  },
  {
    id: 'balance',
    title: 'Step 1: Check Your Balance',
    description: 'This shows how much ETH you have. You can stake any amount you want.',
    targetElement: '.tutorial-balance',
    position: 'bottom',
    arrow: 'top'
  },
  {
    id: 'amount',
    title: 'Step 2: Enter Amount to Stake',
    description: 'Type how much ETH you want to stake. Try starting with a small amount like 1 or 2 ETH.',
    targetElement: '.tutorial-amount-input',
    position: 'top',
    arrow: 'bottom'
  },
  {
    id: 'max',
    title: 'Quick Tip: MAX Button',
    description: 'Click MAX to stake all your ETH at once. You can always unstake later!',
    targetElement: '.tutorial-max-button',
    position: 'left',
    arrow: 'right'
  },
  {
    id: 'receive',
    title: 'Step 3: See What You\'ll Get',
    description: 'This shows how many eETH tokens you\'ll receive. It\'s always 1:1 - so 1 ETH = 1 eETH.',
    targetElement: '.tutorial-receive',
    position: 'top',
    arrow: 'bottom'
  },
  {
    id: 'stake-button',
    title: 'Step 4: Click Stake!',
    description: 'Click this button to stake your ETH. MetaMask will ask you to confirm the transaction.',
    targetElement: '.tutorial-stake-button',
    position: 'top',
    arrow: 'bottom'
  },
  {
    id: 'rewards',
    title: 'Step 5: Earn Rewards Automatically',
    description: 'You earn 3.5% rewards per year automatically! Your rewards grow every second.',
    targetElement: '.tutorial-rewards',
    position: 'top',
    arrow: 'bottom'
  },
  {
    id: 'portfolio',
    title: 'Step 6: Check Your Portfolio',
    description: 'After staking, click Portfolio to see your eETH balance and claim rewards anytime!',
    targetElement: '.tutorial-portfolio',
    position: 'bottom',
    arrow: 'top'
  },
  {
    id: 'unstake',
    title: 'Unstaking (When You Want Your ETH Back)',
    description: 'Click Unstake below the Stake button to get your ETH back plus all earned rewards. You can unstake anytime!',
    targetElement: '.tutorial-unstake-button',
    position: 'top',
    arrow: 'bottom'
  },
  {
    id: 'complete',
    title: '🎉 You\'re Ready!',
    description: 'That\'s it! Now you can stake ETH, earn rewards, and unstake whenever you want. Have fun learning!',
    targetElement: '.tutorial-welcome',
    position: 'bottom',
    arrow: 'top'
  }
];

// Tutorial for Portfolio tab
const portfolioTutorialSteps: TutorialStep[] = [
  {
    id: 'portfolio-welcome',
    title: 'Welcome to Your Portfolio! 📊',
    description: 'Here you can see all your staked assets, earned rewards, and manage your investments.',
    targetElement: '.tutorial-portfolio-info',
    position: 'bottom',
    arrow: 'top'
  },
  {
    id: 'eeth-balance',
    title: 'Your eETH Balance',
    description: 'This shows how many eETH tokens you own. These represent your staked ETH plus accumulated rewards.',
    targetElement: '.tutorial-eeth-balance',
    position: 'bottom',
    arrow: 'top'
  },
  {
    id: 'weeth-balance',
    title: 'Your weETH Balance',
    description: 'Wrapped eETH (weETH) tokens earn rewards automatically without claiming. Perfect for DeFi!',
    targetElement: '.tutorial-weeth-balance',
    position: 'bottom',
    arrow: 'top'
  },
  {
    id: 'rewards-section',
    title: 'Track Your Rewards',
    description: 'See your staking APR and accumulated rewards. The longer you stake, the more you earn!',
    targetElement: '.tutorial-rewards-section',
    position: 'top',
    arrow: 'bottom'
  },
  {
    id: 'staked-eth',
    title: 'Original Staked Amount',
    description: 'This shows how much ETH you originally deposited. Your rewards are added on top of this.',
    targetElement: '.tutorial-staked-eth',
    position: 'top',
    arrow: 'bottom'
  },
  {
    id: 'claim-button',
    title: 'Claim Your Rewards',
    description: 'Click here to claim your earned rewards as ETH. You can claim anytime without unstaking!',
    targetElement: '.tutorial-claim-button',
    position: 'top',
    arrow: 'bottom'
  },
  {
    id: 'portfolio-complete',
    title: '🎉 Portfolio Mastered!',
    description: 'Now you know how to track your investments and claim rewards. Keep staking to earn more!',
    targetElement: '.tutorial-portfolio-info',
    position: 'bottom',
    arrow: 'top'
  }
];

// Tutorial for Advanced (weETH) tab
const advancedTutorialSteps: TutorialStep[] = [
  {
    id: 'advanced-welcome',
    title: 'Advanced Features 🚀',
    description: 'Learn about wrapping eETH to weETH and using it for lending and borrowing.',
    targetElement: '.tutorial-advanced-welcome',
    position: 'bottom',
    arrow: 'top'
  },
  {
    id: 'advanced-complete',
    title: 'Coming Soon! 🔜',
    description: 'Advanced features like lending and borrowing will be available in the next version of this demo.',
    targetElement: '.tutorial-advanced-welcome',
    position: 'bottom',
    arrow: 'top'
  }
];

const tutorialsByTab = {
  'eETH': stakingTutorialSteps,
  'Portfolio': portfolioTutorialSteps,
  'Advanced': advancedTutorialSteps
};

interface TutorialOverlayProps {
  onComplete: () => void;
  activeTab: 'eETH' | 'Portfolio' | 'Advanced';
}

export default function TutorialOverlay({ onComplete, activeTab }: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const tutorialSteps = tutorialsByTab[activeTab];
  const step = tutorialSteps[currentStep];

  useEffect(() => {
    updateHighlight();
    window.addEventListener('resize', updateHighlight);
    return () => window.removeEventListener('resize', updateHighlight);
  }, [currentStep]);

  const updateHighlight = () => {
    const element = document.querySelector(step.targetElement);
    if (element) {
      // Get rect immediately for instant update
      const rect = element.getBoundingClientRect();
      setHighlightRect(rect);
      calculateTooltipPosition(rect);
      
      // Scroll into view smoothly (non-blocking)
      requestAnimationFrame(() => {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'center'
        });
      });
    }
  };

  const calculateTooltipPosition = (rect: DOMRect) => {
    const padding = 20;
    const tooltipWidth = 380;
    const tooltipHeight = 250; // Reduced height
    const margin = 20; // More margin from edges

    let top = 0;
    let left = 0;

    switch (step.position) {
      case 'top':
        top = rect.top - tooltipHeight - padding;
        left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
        break;
      case 'bottom':
        top = rect.bottom + padding;
        left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
        break;
      case 'left':
        top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
        left = rect.left - tooltipWidth - padding;
        break;
      case 'right':
        top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
        left = rect.right + padding;
        break;
    }

    // Force bottom positioning if top would be cut off
    if (top < margin) {
      top = rect.bottom + padding;
    }

    // Keep tooltip fully on screen with safe margins
    const maxTop = window.innerHeight - tooltipHeight - margin;
    const maxLeft = window.innerWidth - tooltipWidth - margin;
    
    top = Math.max(margin, Math.min(top, maxTop));
    left = Math.max(margin, Math.min(left, maxLeft));

    setTooltipPosition({ top, left });
  };

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setIsTransitioning(true);
      // Quick fade transition
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsTransitioning(false);
      }, 150);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Spotlight cutout */}
      {highlightRect && (
        <>
          {/* Top overlay */}
          <div 
            className="absolute bg-transparent"
            style={{
              top: 0,
              left: 0,
              right: 0,
              height: highlightRect.top - 8
            }}
          />
          {/* Bottom overlay */}
          <div 
            className="absolute bg-transparent"
            style={{
              top: highlightRect.bottom + 8,
              left: 0,
              right: 0,
              bottom: 0
            }}
          />
          {/* Left overlay */}
          <div 
            className="absolute bg-transparent"
            style={{
              top: highlightRect.top - 8,
              left: 0,
              width: highlightRect.left - 8,
              height: highlightRect.height + 16
            }}
          />
          {/* Right overlay */}
          <div 
            className="absolute bg-transparent"
            style={{
              top: highlightRect.top - 8,
              left: highlightRect.right + 8,
              right: 0,
              height: highlightRect.height + 16
            }}
          />

          {/* Highlight border around element */}
          <div
            className="absolute border-4 border-purple-400 rounded-lg pointer-events-none animate-pulse transition-all duration-300 ease-out"
            style={{
              top: highlightRect.top - 8,
              left: highlightRect.left - 8,
              width: highlightRect.width + 16,
              height: highlightRect.height + 16,
              boxShadow: '0 0 0 4px rgba(168, 85, 247, 0.2), 0 0 30px rgba(168, 85, 247, 0.4)'
            }}
          />
        </>
      )}

      {/* Tutorial tooltip */}
      <div
        className="absolute bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl shadow-2xl p-6 border-2 border-purple-400 max-w-sm transition-all duration-300 ease-out overflow-y-auto"
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
          width: '380px',
          maxHeight: 'calc(100vh - 40px)', // Leave 40px margin total
          overflowY: 'auto'
        }}
      >
        {/* Arrow pointing to element */}
        <div
          className={`absolute w-4 h-4 bg-purple-800 border-purple-400 transform rotate-45 ${
            step.arrow === 'top' ? 'border-t-2 border-l-2 -top-2 left-1/2 -translate-x-1/2' :
            step.arrow === 'bottom' ? 'border-b-2 border-r-2 -bottom-2 left-1/2 -translate-x-1/2' :
            step.arrow === 'left' ? 'border-l-2 border-b-2 -left-2 top-1/2 -translate-y-1/2' :
            'border-r-2 border-t-2 -right-2 top-1/2 -translate-y-1/2'
          }`}
        />

        {/* Close button */}
        <button
          onClick={handleSkip}
          className="absolute top-3 right-3 text-gray-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step indicator */}
        <div className={`text-purple-300 text-xs font-medium mb-1.5 transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          Step {currentStep + 1} of {tutorialSteps.length}
        </div>

        {/* Title */}
        <h3 className={`text-white text-lg font-bold mb-2 pr-6 transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {step.title}
        </h3>

        {/* Description */}
        <p className={`text-gray-200 text-sm leading-relaxed mb-5 transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {step.description}
        </p>

        {/* Progress dots */}
        <div className="flex gap-1.5 justify-center mb-4">
          {tutorialSteps.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                index === currentStep 
                  ? 'bg-purple-400 w-5' 
                  : index < currentStep 
                  ? 'bg-purple-500' 
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-2 justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
              currentStep === 0
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-purple-700 text-white hover:bg-purple-600'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium text-sm hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            {currentStep === tutorialSteps.length - 1 ? (
              <>Finish! 🎉</>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Skip tutorial link */}
        {currentStep < tutorialSteps.length - 1 && (
          <button
            onClick={handleSkip}
            className="w-full text-center text-xs text-gray-400 hover:text-gray-300 mt-2 transition-colors"
          >
            Skip tutorial
          </button>
        )}
      </div>
    </div>
  );
}
