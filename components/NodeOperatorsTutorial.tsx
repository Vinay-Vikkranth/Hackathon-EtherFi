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

const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Node Operators Demo! 🌍',
    description: 'Learn how your stake is distributed across independent validators worldwide for maximum security and decentralization!',
    targetElement: '.tutorial-stats',
    position: 'bottom',
    arrow: 'top'
  },
  {
    id: 'stats',
    title: 'Understanding Network Stats',
    description: 'These stats show 8 total operators, 61 active validators across 8 countries with 99.5% average uptime. This demonstrates how distributed and reliable the network is!',
    targetElement: '.tutorial-stats',
    position: 'bottom',
    arrow: 'top'
  },
  {
    id: 'slider',
    title: 'Adjust Your Stake Amount',
    description: 'Use this slider to simulate different stake amounts (1-100 ETH). Watch how your stake automatically distributes across all active operators!',
    targetElement: '.tutorial-slider',
    position: 'bottom',
    arrow: 'top'
  },
  {
    id: 'distribution',
    title: 'Your Stake Distribution',
    description: 'Your stake is automatically split equally across multiple independent operators worldwide. Click on any operator to see their details!',
    targetElement: '.tutorial-distribution',
    position: 'top',
    arrow: 'bottom'
  },
  {
    id: 'comparison',
    title: 'Why Decentralization Matters',
    description: 'Compare centralized vs decentralized staking. With decentralization, if one operator fails, the others keep earning rewards for you!',
    targetElement: '.tutorial-comparison',
    position: 'top',
    arrow: 'bottom'
  },
  {
    id: 'simulation',
    title: 'Test Failure Resilience',
    description: 'Click the "Simulate Operator Failure" button to see what happens when one operator goes offline. Your stake automatically redistributes - no downtime!',
    targetElement: '.tutorial-simulation',
    position: 'top',
    arrow: 'bottom'
  },
  {
    id: 'complete',
    title: '🎉 You\'re a Node Operator Expert!',
    description: 'Now you understand how decentralized node operators protect your stake and make Ethereum more secure. Explore the demo!',
    targetElement: '.tutorial-stats',
    position: 'bottom',
    arrow: 'top'
  }
];

interface Props {
  onComplete: () => void;
}

export default function NodeOperatorsTutorial({ onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const step = tutorialSteps[currentStep];

  useEffect(() => {
    updateHighlight();
    const handleResize = () => updateHighlight();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentStep]);

  const updateHighlight = () => {
    const element = document.querySelector(step.targetElement);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    setHighlightRect(rect);
    calculateTooltipPosition(rect);

    // Scroll element into view
    requestAnimationFrame(() => {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'center'
      });
    });
  };

  const calculateTooltipPosition = (rect: DOMRect) => {
    const padding = 20;
    const tooltipWidth = 380;
    const tooltipHeight = 250;
    const margin = 20;

    let top = 0;
    let left = 0;

    switch (step.position) {
      case 'bottom':
        top = rect.bottom + padding;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        break;
      case 'top':
        top = rect.top - tooltipHeight - padding;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        break;
      case 'left':
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.left - tooltipWidth - padding;
        break;
      case 'right':
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.right + padding;
        break;
    }

    // Auto-detect if tooltip would go off top of screen
    if (top < margin) {
      top = rect.bottom + padding; // Force bottom position
    }

    // Keep within viewport
    const maxTop = window.innerHeight - tooltipHeight - margin;
    const maxLeft = window.innerWidth - tooltipWidth - margin;
    
    if (top > maxTop) top = maxTop;
    if (left < margin) left = margin;
    if (left > maxLeft) left = maxLeft;

    setTooltipPosition({ top, left });
  };

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsTransitioning(false);
      }, 150);
    } else {
      handleComplete();
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

  const handleComplete = () => {
    onComplete();
  };

  return (
    <>
      {/* Backdrop blur */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998]"
        onClick={handleComplete}
      />

      {/* Highlight area for target element */}
      {highlightRect && (
        <>
          {/* Top cover */}
          <div 
            className="fixed bg-black/40 z-[999] pointer-events-none"
            style={{
              top: 0,
              left: 0,
              right: 0,
              height: `${highlightRect.top}px`
            }}
          />
          {/* Left cover */}
          <div 
            className="fixed bg-black/40 z-[999] pointer-events-none"
            style={{
              top: `${highlightRect.top}px`,
              left: 0,
              width: `${highlightRect.left}px`,
              height: `${highlightRect.height}px`
            }}
          />
          {/* Right cover */}
          <div 
            className="fixed bg-black/40 z-[999] pointer-events-none"
            style={{
              top: `${highlightRect.top}px`,
              left: `${highlightRect.right}px`,
              right: 0,
              height: `${highlightRect.height}px`
            }}
          />
          {/* Bottom cover */}
          <div 
            className="fixed bg-black/40 z-[999] pointer-events-none"
            style={{
              top: `${highlightRect.bottom}px`,
              left: 0,
              right: 0,
              bottom: 0
            }}
          />
          {/* Highlight border */}
          <div
            className="fixed pointer-events-none z-[999]"
            style={{
              top: `${highlightRect.top - 4}px`,
              left: `${highlightRect.left - 4}px`,
              width: `${highlightRect.width + 8}px`,
              height: `${highlightRect.height + 8}px`,
            }}
          >
            <div className="absolute inset-0 border-2 border-purple-500 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.6)] animate-pulse" />
          </div>
        </>
      )}

      {/* Tooltip */}
      <div
        className={`fixed z-[1000] bg-gray-900/95 backdrop-blur-md border border-purple-500/30 rounded-xl p-6 shadow-2xl transition-all duration-300 ${
          isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
        style={{
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
          width: '380px',
          maxHeight: '400px',
        }}
      >
        {/* Progress indicator */}
        <div className="flex gap-1 mb-4">
          {tutorialSteps.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'bg-purple-500'
                  : index < currentStep
                  ? 'bg-purple-500/50'
                  : 'bg-gray-700'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-6">{step.description}</p>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Step {currentStep + 1} of {tutorialSteps.length}
          </span>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all shadow-lg shadow-purple-500/25"
            >
              {currentStep === tutorialSteps.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

