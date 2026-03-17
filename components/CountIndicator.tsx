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
    <div className="flex items-center justify-center gap-6 py-4">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-full border-4 transition-colors duration-300"
          style={{
            width: '72px',
            height: '72px',
            backgroundColor: i < rollCount ? activeColor : 'transparent',
            borderColor: i < rollCount ? activeColor : inactiveColor,
          }}
        />
      ))}
    </div>
  );
}