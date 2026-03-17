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
    <div className="flex items-center justify-center gap-6 py-5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-full border-[3px] transition-colors duration-300"
          style={{
            width: '38px',
            height: '38px',
            backgroundColor: i < rollCount ? activeColor : 'transparent',
            borderColor: i < rollCount ? activeColor : inactiveColor,
          }}
        />
      ))}
    </div>
  );
}