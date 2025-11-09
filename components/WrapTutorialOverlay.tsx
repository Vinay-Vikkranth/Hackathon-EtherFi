'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  targetElement: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  arrow: 'top' | 'bottom' | 'left' | 'right';
}

const wrapTutorialSteps: TutorialStep[] = [
  {
    id: 'wrap-welcome',
    title: 'What is Wrapping? 🎁',
    description: 'Wrapping converts your eETH into weETH. Both earn rewards, but weETH is better for DeFi (no need to claim rewards manually)!',
    targetElement: '.tutorial-welcome',
    position: 'bottom',
    arrow: 'top'
  },
  {
    id: 'wrap-input',
    title: 'Enter Amount to Wrap',
    description: 'Type how much eETH you want to wrap into weETH. You can wrap all of it or just a portion.',
    targetElement: '.tutorial-amount-input',
    position: 'top',
    arrow: 'bottom'
  },
  {
    id: 'wrap-receive',
    title: 'You\'ll Receive weETH',
    description: 'The exchange is 1:1 - so 1 eETH becomes 1 weETH. Both earn the same 3.5% rewards!',
    targetElement: '.tutorial-receive',
    position: 'top',
    arrow: 'bottom'
  },
  {
    id: 'wrap-button',
    title: 'Click Wrap to Convert',
    description: 'Click this button to wrap your eETH. MetaMask will ask you to confirm the transaction.',
    targetElement: '.tutorial-stake-button',
    position: 'top',
    arrow: 'bottom'
  },
  {
    id: 'wrap-complete',
    title: '🎉 Wrapping Explained!',
    description: 'Now you know how to wrap eETH to weETH! Use weETH in DeFi protocols while still earning staking rewards.',
    targetElement: '.tutorial-welcome',
    position: 'bottom',
    arrow: 'top'
  }
];

interface WrapTutorialOverlayProps {
  onComplete: () => void;
}

export default function WrapTutorialOverlay({ onComplete }: WrapTutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const step = wrapTutorialSteps[currentStep];

  useEffect(() => {
    updateHighlight();
    window.addEventListener('resize', updateHighlight);
    return () => window.removeEventListener('resize', updateHighlight);
  }, [currentStep]);

  const updateHighlight = () => {
    const element = document.querySelector(step.targetElement);
    if (element) {
      const rect = element.getBoundingClientRect();
      setHighlightRect(rect);
      calculateTooltipPosition(rect);
      
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
    const tooltipHeight = 250;
    const margin = 20;

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

    const maxTop = window.innerHeight - tooltipHeight - margin;
    const maxLeft = window.innerWidth - tooltipWidth - margin;
    
    top = Math.max(margin, Math.min(top, maxTop));
    left = Math.max(margin, Math.min(left, maxLeft));

    setTooltipPosition({ top, left });
  };

  const handleNext = () => {
    if (currentStep < wrapTutorialSteps.length - 1) {
      setIsTransitioning(true);
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
          <div className="absolute bg-transparent" style={{ top: 0, left: 0, right: 0, height: highlightRect.top - 8 }} />
          <div className="absolute bg-transparent" style={{ top: highlightRect.bottom + 8, left: 0, right: 0, bottom: 0 }} />
          <div className="absolute bg-transparent" style={{ top: highlightRect.top - 8, left: 0, width: highlightRect.left - 8, height: highlightRect.height + 16 }} />
          <div className="absolute bg-transparent" style={{ top: highlightRect.top - 8, left: highlightRect.right + 8, right: 0, height: highlightRect.height + 16 }} />

          {/* Highlight border */}
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
          maxHeight: 'calc(100vh - 40px)',
          overflowY: 'auto'
        }}
      >
        {/* Arrow */}
        <div
          className={`absolute w-4 h-4 bg-purple-800 border-purple-400 transform rotate-45 ${
            step.arrow === 'top' ? 'border-t-2 border-l-2 -top-2 left-1/2 -translate-x-1/2' :
            step.arrow === 'bottom' ? 'border-b-2 border-r-2 -bottom-2 left-1/2 -translate-x-1/2' :
            step.arrow === 'left' ? 'border-l-2 border-b-2 -left-2 top-1/2 -translate-y-1/2' :
            'border-r-2 border-t-2 -right-2 top-1/2 -translate-y-1/2'
          }`}
        />

        {/* Close button */}
        <button onClick={handleSkip} className="absolute top-3 right-3 text-gray-300 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* Step indicator */}
        <div className={`text-purple-300 text-xs font-medium mb-1.5 transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          Step {currentStep + 1} of {wrapTutorialSteps.length}
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
          {wrapTutorialSteps.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                index === currentStep ? 'bg-purple-400 w-5' : index < currentStep ? 'bg-purple-500' : 'bg-gray-600'
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
              currentStep === 0 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-purple-700 text-white hover:bg-purple-600'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium text-sm hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            {currentStep === wrapTutorialSteps.length - 1 ? (
              <>Got it! 🎉</>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Skip tutorial link */}
        {currentStep < wrapTutorialSteps.length - 1 && (
          <button onClick={handleSkip} className="w-full text-center text-xs text-gray-400 hover:text-gray-300 mt-2 transition-colors">
            Skip tutorial
          </button>
        )}
      </div>
    </div>
  );
}
