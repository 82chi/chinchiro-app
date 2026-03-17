'use client';

import React from 'react';

interface CountIndicatorProps {
  rollCount: number;
  activeColor: string;
  inactiveColor: string;
}

export default function CountIndicator({
  rollCount,
  activeColor,
  inactiveColor,
}: CountIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-4 py-4">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-6 h-6 rounded-full border-2 transition-colors duration-300"
          style={{
            backgroundColor: i < rollCount ? activeColor : 'transparent',
            borderColor: i < rollCount ? activeColor : inactiveColor,
          }}
        />
      ))}
    </div>
  );
}
