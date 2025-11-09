'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import StakingInterface from '@/components/StakingInterface';
import PortfolioView from '@/components/PortfolioView';
import EducationalModal from '@/components/EducationalModal';
import TutorialOverlay from '@/components/TutorialOverlay';
import FinnyChatbot from '@/components/FinnyChatbot';
import EtherfiAcademy from '@/components/EtherfiAcademy';
import BeforeYouBeginModal from '@/components/BeforeYouBeginModal';
import BadgeNotification from '@/components/BadgeNotification';
import BadgesPanel from '@/components/BadgesPanel';
import DuolingoStyleQuiz from '@/components/DuolingoStyleQuiz';
import { Web3Provider } from '@/contexts/Web3Context';
import { LearningProvider, useLearning } from '@/contexts/LearningContext';

function HomeContent() {
  const [activeTab, setActiveTab] = useState<'eETH' | 'Portfolio' | 'Advanced'>('eETH');
  const [showEducation, setShowEducation] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const { earnBadge, hasEarnedBadge } = useLearning();

  // Show intro slides on every page load
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    
    if (!hasVisited) {
      setShowEducation(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
    
    // Always show intro on reload
    setShowIntro(true);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  // Check if user has seen tutorial for each tab
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem(`hasSeenTutorial_${activeTab}`);
    if (!hasSeenTutorial && activeTab !== 'Advanced') {
      // Wait a moment after tab change to show tutorial
      setTimeout(() => setShowTutorial(true), 500);
    } else {
      setShowTutorial(false);
    }
  }, [activeTab]);

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    localStorage.setItem(`hasSeenTutorial_${activeTab}`, 'true');
    earnBadge('tutorial_complete');
  };

  const restartTutorial = () => {
    setShowTutorial(true);
  };

  // Listen for navigation events from Ether.fi Academy
  useEffect(() => {
    const handleNavigate = (e: any) => {
      setActiveTab(e.detail);
    };
    
    window.addEventListener('navigate-tab', handleNavigate);
    return () => window.removeEventListener('navigate-tab', handleNavigate);
  }, []);

  return (
      <div className="min-h-screen text-white relative">
        {/* Intro Modal */}
        {showIntro && (
          <BeforeYouBeginModal onComplete={handleIntroComplete} />
        )}

        {/* Badge Notification */}
        <BadgeNotification />

        {/* Badges Panel */}
        <BadgesPanel />

        {/* Quiz Game */}
        {showQuiz && (
          <DuolingoStyleQuiz 
            onComplete={(score) => {
              console.log('Quiz completed with score:', score);
              if (score >= 50) {
                earnBadge('quiz_master');
              }
            }}
            onClose={() => setShowQuiz(false)}
          />
        )}

        {/* Background Glow Effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <Header />
          
          {/* Tutorial Overlay */}
          {showTutorial && (
            <TutorialOverlay onComplete={handleTutorialComplete} activeTab={activeTab} />
          )}
        
        {/* Educational Disclaimer */}
        {showEducation && (
          <EducationalModal onClose={() => setShowEducation(false)} />
        )}

        {/* Navigation Tabs */}
        <div className="max-w-4xl mx-auto px-4 pt-8">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('eETH')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'eETH'
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-700 text-gray-400 hover:text-white'
              }`}
            >
              eETH
            </button>
            <button
              onClick={() => setActiveTab('Portfolio')}
              className={`px-6 py-3 rounded-lg font-medium transition-all tutorial-portfolio ${
                activeTab === 'Portfolio'
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-700 text-gray-400 hover:text-white'
              }`}
            >
              Portfolio
            </button>
            <button
              onClick={() => setActiveTab('Advanced')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'Advanced'
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-700 text-gray-400 hover:text-white'
              }`}
            >
              Advanced
            </button>
            
            {/* Tutorial Button - Only show on eETH and Portfolio tabs */}
            {activeTab !== 'Advanced' && (
              <button
                onClick={restartTutorial}
                className="ml-auto px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium text-sm hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70"
              >
                <span>📚</span> Start Tutorial
              </button>
            )}
            
            {/* Quiz Button - Only show on Advanced tab */}
            {activeTab === 'Advanced' && (
              <button
                onClick={() => setShowQuiz(true)}
                className="ml-auto px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg font-medium text-sm hover:from-green-700 hover:to-emerald-700 transition-all flex items-center gap-2 shadow-lg shadow-green-500/50 hover:shadow-green-500/70"
              >
                <span>🎮</span> Test Knowledge
              </button>
            )}
          </div>

          {/* Content Area */}
          <div className={activeTab === 'Advanced' ? '' : 'max-w-lg mx-auto'}>
            {activeTab === 'eETH' && <StakingInterface />}
            {activeTab === 'Portfolio' && <PortfolioView />}
          </div>
          {activeTab === 'Advanced' && <EtherfiAcademy />}
        </div>

        {/* Footer Disclaimer */}
        <footer className="fixed bottom-0 w-full bg-dark-900 bg-opacity-80 backdrop-blur-sm py-2 px-4 z-20">
          <p className="text-center text-xs text-gray-500">
            Educational demo — not financial advice. No real funds used. For learning purposes only.
          </p>
        </footer>

        {/* Finny Chatbot */}
        <FinnyChatbot />
        </div>
      </div>
  );
}

export default function Home() {
  return (
    <Web3Provider>
      <LearningProvider>
        <HomeContent />
      </LearningProvider>
    </Web3Provider>
  );
}
