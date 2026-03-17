'use client';

import React from 'react';
import { DiceValue } from '@/types';
import DiceSet from './DiceSet';

interface BowlProps {
  dice: [DiceValue, DiceValue, DiceValue];
  isRolling: boolean;
  isHolding: boolean;
  bowlOuter: string;
  bowlInner: string;
  onPointerDown: () => void;
  onPointerUp: () => void;
  disabled: boolean;
}

export default function Bowl({
  dice,
  isRolling,
  isHolding,
  bowlOuter,
  bowlInner,
  onPointerDown,
  onPointerUp,
  disabled,
}: BowlProps) {
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ touchAction: 'none' }}
      onPointerDown={disabled ? undefined : onPointerDown}
      onPointerUp={disabled ? undefined : onPointerUp}
    >
      {/* Bowl SVG */}
      <svg
        viewBox="0 0 320 200"
        className="w-72 h-48 sm:w-80 sm:h-52"
        style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.6))' }}
      >
        <defs>
          {/* Outer bowl gradient */}
          <radialGradient id="outerBowl" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#3a1a00" />
            <stop offset="100%" stopColor={bowlOuter} />
          </radialGradient>
          {/* Inner bowl gradient */}
          <radialGradient id="innerBowl" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#d04020" />
            <stop offset="40%" stopColor={bowlInner} />
            <stop offset="100%" stopColor="#500000" />
          </radialGradient>
          {/* Rim highlight */}
          <linearGradient id="rimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b6914" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#c9a227" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6b4c0e" stopOpacity="0.4" />
          </linearGradient>
          <clipPath id="bowlClip">
            <ellipse cx="160" cy="115" rx="130" ry="95" />
          </clipPath>
        </defs>

        {/* Outer bowl body */}
        <ellipse cx="160" cy="120" rx="148" ry="78" fill="url(#outerBowl)" />

        {/* Inner bowl */}
        <ellipse cx="160" cy="115" rx="130" ry="65" fill="url(#innerBowl)" />

        {/* Inner bowl sheen */}
        <ellipse
          cx="140"
          cy="95"
          rx="55"
          ry="22"
          fill="white"
          fillOpacity="0.07"
          transform="rotate(-10, 140, 95)"
        />

        {/* Rim */}
        <ellipse
          cx="160"
          cy="50"
          rx="148"
          ry="36"
          fill="url(#rimGrad)"
        />
        {/* Rim top edge highlight */}
        <ellipse
          cx="160"
          cy="48"
          rx="140"
          ry="28"
          fill="none"
          stroke="#c9a227"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
        {/* Rim inner shadow */}
        <ellipse
          cx="160"
          cy="55"
          rx="130"
          ry="24"
          fill={bowlInner}
          fillOpacity="0.6"
        />
      </svg>

      {/* Dice inside the bowl */}
      <div
        className="absolute flex items-center justify-center"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -42%)' }}
      >
        <DiceSet dice={dice} isRolling={isRolling} isHolding={isHolding} />
      </div>

      {/* Tap hint when not rolling and turn not over */}
      {!isRolling && !isHolding && !disabled && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center pointer-events-none">
          <span className="text-white/40 text-xs">タップして振る</span>
        </div>
      )}
    </div>
  );
}
