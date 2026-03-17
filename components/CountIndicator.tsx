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
        // ロール済みのドット（isActive）も含め、豚なら「豚」表示
        const isButaDot = showButa && isActive;
        // 未使用ドットで豚のとき
        const isButaEmpty = showButa && !isActive;

        if (isButaDot || isButaEmpty) {
          return (
            <div
              key={i}
              className="rounded-full border-4 transition-colors duration-300 flex items-center justify-center"
              style={{
                width: '72px',
                height: '72px',
                backgroundColor: isButaDot ? activeColor : 'transparent',
                borderColor: isButaDot ? activeColor : inactiveColor,
              }}
            >
              <span
                className="font-bold select-none leading-none"
                style={{
                  fontSize: '30px',
                  color: isButaDot ? '#fff' : inactiveColor,
                  lineHeight: 1,
                }}
              >
                豚
              </span>
            </div>
          );
        }

        return (
          <div
            key={i}
            className="rounded-full border-4 transition-colors duration-300"
            style={{
              width: '72px',
              height: '72px',
              backgroundColor: isActive ? activeColor : 'transparent',
              borderColor: isActive ? activeColor : inactiveColor,
            }}
          />
        );
      })}
    </div>
  );
}