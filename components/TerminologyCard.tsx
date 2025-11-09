'use client';

import { useState } from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';

interface TerminologyContent {
  pro: string;
  simple: string;
}

interface Props {
  title: string;
  proContent: string;
  simpleContent: string;
  children?: React.ReactNode;
}

export default function TerminologyCard({ title, proContent, simpleContent, children }: Props) {
  const [isSimpleMode, setIsSimpleMode] = useState(true);

  return (
    <div className="bg-dark-800/50 rounded-xl p-5 border border-dark-700">
      {/* Toggle switch */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">{title}</h3>
        <button
          onClick={() => setIsSimpleMode(!isSimpleMode)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            isSimpleMode
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
              : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
          }`}
        >
          {isSimpleMode ? (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Simple</span>
            </>
          ) : (
            <>
              <GraduationCap className="w-4 h-4" />
              <span>Pro</span>
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="text-gray-300 text-sm leading-relaxed">
        {isSimpleMode ? (
          <div className="space-y-2">
            <p>{simpleContent}</p>
            <button
              onClick={() => setIsSimpleMode(false)}
              className="text-purple-400 hover:text-purple-300 text-xs transition-colors"
            >
              → Show technical details
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <p>{proContent}</p>
            <button
              onClick={() => setIsSimpleMode(true)}
              className="text-purple-400 hover:text-purple-300 text-xs transition-colors"
            >
              → Simplify explanation
            </button>
          </div>
        )}
      </div>

      {/* Optional children content */}
      {children && (
        <div className="mt-4 pt-4 border-t border-dark-700">
          {children}
        </div>
      )}
    </div>
  );
}
