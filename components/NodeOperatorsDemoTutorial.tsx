'use client';

import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const tutorialSteps = [
  {
    title: 'Welcome to Node Operators! 🌍',
    description: 'Learn how your stake is distributed across independent validators worldwide for maximum security and decentralization.',
    target: null,
    position: 'center'
  },
  {
    title: 'Network Statistics',
    description: 'These cards show key metrics: total operators (8), active validators (61), countries represented (8), and average uptime (99.5%).',
    target: '.stats-cards',
    position: 'bottom'
  },
  {
    title: 'Your Stake Amount',
    description: 'Adjust this slider to see how your ETH would be distributed across all operators. Try moving it now!',
    target: '.stake-slider-section',
    position: 'bottom'
  },
  {
    title: 'Stake Distribution',
    description: 'Watch how your stake is automatically split equally among all active operators. Each operator gets a fair share.',
    target: '.operator-list',
    position: 'top'
  },
  {
    title: 'Operator Details',
    description: 'Click on any operator to see detailed information: validators count, uptime percentage, location, and your stake amount.',
    target: '.operator-item',
    position: 'left'
  },
  {
    title: 'Geographic Distribution',
    description: 'Notice the flags 🇺🇸🇩🇪🇸🇬🇨🇦🇬🇧🇦🇺🇯🇵🇨🇭 - your stake is spread across 8 countries on multiple continents!',
    target: '.operator-list',
    position: 'top'
  },
  {
    title: 'Centralized vs Decentralized',
    description: 'Compare the risks of centralized staking (single point of failure) vs decentralized (automatic failover, distributed risk).',
    target: '.comparison-cards',
    position: 'top'
  },
  {
    title: 'Test Failure Simulation',
    description: 'Click this button to see what happens when an operator goes offline. Your stake automatically redistributes to remaining operators!',
    target: '.simulation-section',
    position: 'top'
  },
  {
    title: 'Ready to Stake! 🎉',
    description: 'Now you understand how decentralized node operators protect your stake. Go back to start staking with confidence!',
    target: '.cta-section',
    position: 'top'
  }
];

interface NodeOperatorsDemoTutorialProps {
  onComplete: () => void;
}

export default function NodeOperatorsDemoTutorial({ onComplete }: NodeOperatorsDemoTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipStyle, setTooltipStyle] = useState<any>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const step = tutorialSteps[currentStep];

  useEffect(() => {
    requestAnimationFrame(() => {
      updateTooltipPosition();
    });
    window.addEventListener('resize', updateTooltipPosition);
    return () => window.removeEventListener('resize', updateTooltipPosition);
  }, [currentStep]);

  const updateTooltipPosition = () => {
    if (!step.target) {
      setTooltipStyle({
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '500px'
      });
      return;
    }

    const targetElement = document.querySelector(step.target);
    if (!targetElement) {
      // Fallback to center if target not found
      setTooltipStyle({
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '500px'
      });
      return;
    }

    const rect = targetElement.getBoundingClientRect();
    const tooltipHeight = 280;
    const tooltipWidth = 400;
    const margin = 20;
    let top, left, transform;

    switch (step.position) {
      case 'bottom':
        top = rect.bottom + margin;
        left = rect.left + rect.width / 2;
        transform = 'translateX(-50%)';
        if (top + tooltipHeight > window.innerHeight - margin) {
          top = rect.top - tooltipHeight - margin;
        }
        break;
      case 'top':
        top = rect.top - tooltipHeight - margin;
        left = rect.left + rect.width / 2;
        transform = 'translateX(-50%)';
        if (top < margin) {
          top = rect.bottom + margin;
        }
        break;
      case 'left':
        top = rect.top + rect.height / 2;
        left = rect.left - tooltipWidth - margin;
        transform = 'translateY(-50%)';
        if (left < margin) {
          left = rect.right + margin;
        }
        break;
      case 'right':
        top = rect.top + rect.height / 2;
        left = rect.right + margin;
        transform = 'translateY(-50%)';
        if (left + tooltipWidth > window.innerWidth - margin) {
          left = rect.left - tooltipWidth - margin;
        }
        break;
      default:
        top = rect.bottom + margin;
        left = rect.left + rect.width / 2;
        transform = 'translateX(-50%)';
    }

    // Ensure tooltip stays within viewport
    if (top < margin) top = margin;
    if (top + tooltipHeight > window.innerHeight - margin) {
      top = window.innerHeight - tooltipHeight - margin;
    }

    setTooltipStyle({
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      transform: transform,
      maxWidth: '400px',
      maxHeight: `calc(100vh - ${margin * 2}px)`,
      overflowY: 'auto'
    });

    // Scroll target into view
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
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

  return (
    <div className="fixed inset-0 z-50">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Spotlight on target element */}
      {step.target && (
        <style jsx global>{`
          ${step.target} {
            position: relative;
            z-index: 51 !important;
            box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.5), 0 0 60px 20px rgba(168, 85, 247, 0.3) !important;
            border-radius: 12px !important;
          }
        `}</style>
      )}

      {/* Tutorial Tooltip */}
      <div
        ref={tooltipRef}
        style={tooltipStyle}
        className={`z-[52] bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 shadow-2xl border-2 border-purple-400 transition-opacity duration-150 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Close button */}
        <button
          onClick={onComplete}
          className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step indicator */}
        <p className="text-purple-100 text-sm mb-2">
          Step {currentStep + 1} of {tutorialSteps.length}
        </p>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>

        {/* Description */}
        <p className="text-white text-sm mb-6 leading-relaxed">{step.description}</p>

        {/* Progress dots */}
        <div className="flex gap-2 mb-4 justify-center">
          {tutorialSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentStep 
                  ? 'bg-white w-8' 
                  : index < currentStep 
                  ? 'bg-purple-300 w-2' 
                  : 'bg-purple-800 w-2'
              }`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-3 justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
              currentStep === 0
                ? 'bg-purple-800 text-purple-400 cursor-not-allowed'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2 bg-white text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition-all"
          >
            {currentStep === tutorialSteps.length - 1 ? 'Finish' : 'Next'}
            {currentStep < tutorialSteps.length - 1 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Skip tutorial */}
        {currentStep < tutorialSteps.length - 1 && (
          <button
            onClick={onComplete}
            className="w-full text-center text-white/70 text-sm mt-3 hover:text-white transition-colors"
          >
            Skip tutorial
          </button>
        )}
      </div>
    </div>
  );
}
