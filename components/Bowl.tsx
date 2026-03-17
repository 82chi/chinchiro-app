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
  tapHint: string;
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
  tapHint,
}: BowlProps) {
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ touchAction: 'none', width: '85vw', maxWidth: '400px' }}
      onPointerDown={disabled ? undefined : onPointerDown}
      onPointerUp={disabled ? undefined : onPointerUp}
    >
      {/* Top-down bowl: outer ring */}
      <div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: '100%',
          paddingBottom: '100%',
          backgroundColor: bowlOuter,
          boxShadow: '0 12px 40px rgba(0,0,0,0.7), inset 0 2px 8px rgba(255,255,255,0.08)',
        }}
      >
        {/* Inner bowl circle with radial gradient */}
        <div
          className="absolute rounded-full"
          style={{
            top: '7%',
            left: '7%',
            right: '7%',
            bottom: '7%',
            background: `radial-gradient(circle at 40% 40%, #e8392a 0%, ${bowlInner} 55%, #500000 100%)`,
            boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          {/* Gloss highlight */}
          <div
            className="absolute rounded-full"
            style={{
              top: '10%',
              left: '12%',
              width: '32%',
              height: '18%',
              background: 'rgba(255,255,255,0.15)',
              transform: 'rotate(-20deg)',
              filter: 'blur(3px)',
            }}
          />

          {/* Dice inside the bowl */}
          <div
            className="absolute inset-0 flex items-center justify-center"
          >
            <DiceSet dice={dice} isRolling={isRolling} isHolding={isHolding} />
          </div>
        </div>
      </div>

      {/* Tap hint */}
      {!isRolling && !isHolding && !disabled && (
        <div className="absolute -bottom-7 left-0 right-0 flex justify-center pointer-events-none">
          <span className="text-current opacity-40 text-sm">{tapHint}</span>
        </div>
      )}
    </div>
  );
}
