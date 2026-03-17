'use client';

import React from 'react';

interface CountIndicatorProps {
  rollCount: number;
  activeColor: string;
  inactiveColor: string;
  roleType?: string | null;
  isTurnOver?: boolean;
}

export default function CountIndicator({
  rollCount,
  activeColor,
  inactiveColor,
  roleType,
  isTurnOver,
}: CountIndicatorProps) {
  // Show 豚 only on dots that have already been rolled AND the result was buta
  const showButa = roleType === 'buta';

  return (
    <div className="flex items-center justify-center gap-6 py-4">
      {[0, 1, 2].map((i) => {
        const isActive = i < rollCount;
        // Only show 豚 on dots that were already used (isActive), not on future dots
        const isButaDot = showButa && isActive;

        return (
          <div
            key={i}
            className="rounded-full border-4 transition-colors duration-300 flex items-center justify-center"
            style={{
              width: '72px',
              height: '72px',
              backgroundColor: isActive ? activeColor : 'transparent',
              borderColor: isActive ? activeColor : inactiveColor,
            }}
          >
            {isButaDot && (
              <span
                className="font-bold select-none leading-none"
                style={{
                  fontSize: '30px',
                  color: '#fff',
                  lineHeight: 1,
                }}
              >
                豚
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}