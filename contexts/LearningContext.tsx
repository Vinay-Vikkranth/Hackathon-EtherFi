'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  timestamp?: number;
}

interface LearningContextType {
  badges: Badge[];
  earnBadge: (badgeId: string) => void;
  hasEarnedBadge: (badgeId: string) => boolean;
  totalBadges: number;
  earnedBadges: number;
  showBadgeNotification: boolean;
  latestBadge: Badge | null;
  dismissBadgeNotification: () => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

const AVAILABLE_BADGES: Badge[] = [
  {
    id: 'first_stake',
    name: 'First Stake',
    description: 'Staked ETH for the first time',
    icon: '💎',
    earned: false
  },
  {
    id: 'wrapped_tokens',
    name: 'Wrapper Master',
    description: 'Wrapped eETH to weETH',
    icon: '🎁',
    earned: false
  },
  {
    id: 'borrowed_funds',
    name: 'DeFi Borrower',
    description: 'Borrowed against your stake',
    icon: '💰',
    earned: false
  },
  {
    id: 'tutorial_complete',
    name: 'Tutorial Graduate',
    description: 'Completed a tutorial walkthrough',
    icon: '✨',
    earned: false
  },
  {
    id: 'node_operators_explored',
    name: 'Decentralization Advocate',
    description: 'Explored node operators demo',
    icon: '🌍',
    earned: false
  },
  {
    id: 'restaking_learned',
    name: 'Restaking Expert',
    description: 'Learned about EigenLayer restaking',
    icon: '🔄',
    earned: false
  },
  {
    id: 'loyalty_points_viewed',
    name: 'Loyalty Enthusiast',
    description: 'Explored the loyalty points system',
    icon: '⭐',
    earned: false
  },
  {
    id: 'chatbot_used',
    name: 'Question Asker',
    description: 'Asked Finny a question',
    icon: '💬',
    earned: false
  },
  {
    id: 'quiz_master',
    name: 'Quiz Master',
    description: 'Scored 50+ in Staking Survivor',
    icon: '🏆',
    earned: false
  }
];

export function LearningProvider({ children }: { children: ReactNode }) {
  const [badges, setBadges] = useState<Badge[]>(AVAILABLE_BADGES);
  const [showBadgeNotification, setShowBadgeNotification] = useState(false);
  const [latestBadge, setLatestBadge] = useState<Badge | null>(null);

  // Load badges from localStorage on mount
  useEffect(() => {
    const savedBadges = localStorage.getItem('earnedBadges');
    if (savedBadges) {
      try {
        const parsed = JSON.parse(savedBadges);
        setBadges(prevBadges => 
          prevBadges.map(badge => ({
            ...badge,
            earned: parsed[badge.id]?.earned || false,
            timestamp: parsed[badge.id]?.timestamp
          }))
        );
      } catch (e) {
        console.error('Failed to load badges:', e);
      }
    }
  }, []);

  const earnBadge = (badgeId: string) => {
    setBadges(prevBadges => {
      const updatedBadges = prevBadges.map(badge => {
        if (badge.id === badgeId && !badge.earned) {
          const earnedBadge = {
            ...badge,
            earned: true,
            timestamp: Date.now()
          };
          
          // Show notification
          setLatestBadge(earnedBadge);
          setShowBadgeNotification(true);
          
          // Auto-dismiss after 5 seconds
          setTimeout(() => {
            setShowBadgeNotification(false);
          }, 5000);
          
          return earnedBadge;
        }
        return badge;
      });

      // Save to localStorage
      const badgeMap = updatedBadges.reduce((acc, badge) => {
        if (badge.earned) {
          acc[badge.id] = { earned: true, timestamp: badge.timestamp };
        }
        return acc;
      }, {} as Record<string, { earned: boolean; timestamp?: number }>);
      
      localStorage.setItem('earnedBadges', JSON.stringify(badgeMap));

      return updatedBadges;
    });
  };

  const hasEarnedBadge = (badgeId: string) => {
    return badges.find(b => b.id === badgeId)?.earned || false;
  };

  const dismissBadgeNotification = () => {
    setShowBadgeNotification(false);
  };

  const earnedBadges = badges.filter(b => b.earned).length;
  const totalBadges = badges.length;

  return (
    <LearningContext.Provider 
      value={{ 
        badges, 
        earnBadge, 
        hasEarnedBadge, 
        totalBadges, 
        earnedBadges,
        showBadgeNotification,
        latestBadge,
        dismissBadgeNotification
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within LearningProvider');
  }
  return context;
}
