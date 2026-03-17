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
  const showButa = roleType === 'buta' && !isTurnOver;

  return (
    <div className="flex items-center justify-center gap-6 py-4">
      {[0, 1, 2].map((i) => {
        const isActive = i < rollCount;
        const isButaDot = showButa && !isActive;
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
                className="font-bold select-none"
                style={{ fontSize: '22px', color: inactiveColor }}
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