'use client';

import { useState } from 'react';
import { Award, X } from 'lucide-react';
import { useLearning } from '@/contexts/LearningContext';

export default function BadgesPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { badges, earnedBadges, totalBadges } = useLearning();

  return (
    <>
      {/* Floating badge button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110 group"
      >
        <Award className="w-6 h-6" />
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-purple-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {earnedBadges}
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
          <div className="bg-gray-900 text-white text-sm rounded-lg px-3 py-2 whitespace-nowrap">
            {earnedBadges}/{totalBadges} Badges Earned
          </div>
        </div>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-dark-900 border-2 border-purple-500/30 rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Award className="w-7 h-7 text-purple-400" />
                  Learning Badges
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  {earnedBadges} of {totalBadges} earned
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Progress</span>
                <span>{Math.round((earnedBadges / totalBadges) * 100)}%</span>
              </div>
              <div className="h-3 bg-dark-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${(earnedBadges / totalBadges) * 100}%` }}
                />
              </div>
            </div>

            {/* Badges grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`rounded-xl p-4 transition-all ${
                    badge.earned
                      ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-2 border-purple-500/50'
                      : 'bg-dark-800/50 border-2 border-dark-700 opacity-50'
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-4xl mb-2 ${badge.earned ? '' : 'grayscale'}`}>
                      {badge.icon}
                    </div>
                    <h3 className={`font-semibold text-sm mb-1 ${
                      badge.earned ? 'text-white' : 'text-gray-500'
                    }`}>
                      {badge.name}
                    </h3>
                    <p className={`text-xs ${
                      badge.earned ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {badge.description}
                    </p>
                    {badge.earned && badge.timestamp && (
                      <p className="text-xs text-purple-400 mt-2">
                        ✓ Earned {new Date(badge.timestamp).toLocaleDateString()}
                      </p>
                    )}
                    {!badge.earned && (
                      <p className="text-xs text-gray-600 mt-2">
                        🔒 Locked
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
              <p className="text-purple-300 text-sm text-center">
                💡 <strong>Keep exploring!</strong> Try different features to unlock all badges and master liquid staking.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
