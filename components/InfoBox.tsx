'use client';

import { ReactNode } from 'react';

interface InfoBoxProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export default function InfoBox({ title, children, onClose }: InfoBoxProps) {
  return (
    <div className="bg-blue-900 bg-opacity-20 border border-blue-600 rounded-xl p-4 relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h3 className="font-semibold text-blue-300 mb-3">{title}</h3>
      <div className="text-gray-300 pr-6">{children}</div>
    </div>
  );
}
