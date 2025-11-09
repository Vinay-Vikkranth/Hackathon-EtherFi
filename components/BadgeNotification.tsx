'use client';

import { useEffect, useState } from 'react';
import { Trophy, X } from 'lucide-react';
import { useLearning } from '@/contexts/LearningContext';

export default function BadgeNotification() {
  const { showBadgeNotification, latestBadge, dismissBadgeNotification } = useLearning();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showBadgeNotification) {
      setIsVisible(true);
    } else {
      // Delay hiding to allow animation
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [showBadgeNotification]);

  if (!isVisible || !latestBadge) return null;

  return (
    <div 
      className={`fixed top-20 right-4 z-[1000] transition-all duration-300 ${
        showBadgeNotification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-4 shadow-2xl border-2 border-purple-400 min-w-[320px] animate-bounce-once">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Trophy className="w-6 h-6 text-yellow-300" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-white text-lg">Badge Earned! 🎉</h3>
              <button
                onClick={dismissBadgeNotification}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-2 flex items-center gap-2">
              <span className="text-3xl">{latestBadge.icon}</span>
              <div>
                <p className="font-semibold text-white">{latestBadge.name}</p>
                <p className="text-sm text-purple-100">{latestBadge.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 pt-3 border-t border-white/20">
          <p className="text-xs text-purple-100 text-center">
            Keep learning to unlock more badges!
          </p>
        </div>
      </div>
    </div>
  );
}
