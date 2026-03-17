'use client';

import React from 'react';
import { DiceValue } from '@/types';
import DiceSet from './DiceSet';

interface BowlProps {
  dice: [DiceValue, DiceValue, DiceValue];
  isRolling: boolean;
  isHolding: boolean;
  bowlOuter?: string;
  bowlInner?: string;
  onPointerDown: () => void;
  onPointerUp: () => void;
  disabled: boolean;
  tapHint?: string;
}

export default function Bowl({
  dice,
  isRolling,
  isHolding,
  onPointerDown,
  onPointerUp,
  disabled,
  tapHint = 'タップして振る',
}: BowlProps) {
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{
        width: 'min(85vw, 400px)',
        height: 'min(85vw, 400px)',
        touchAction: 'none',
      }}
      onPointerDown={disabled ? undefined : onPointerDown}
      onPointerUp={disabled ? undefined : onPointerUp}
    >
      {/* Outer circle – dark lacquer rim */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: '#1a0a00',
          boxShadow:
            '0 12px 40px rgba(0,0,0,0.7), 0 4px 12px rgba(0,0,0,0.5), inset 0 2px 6px rgba(255,255,255,0.04)',
        }}
      />

      {/* Inner circle – red lacquer bowl interior */}
      <div
        className="absolute rounded-full"
        style={{
          inset: '10%',
          background:
            'radial-gradient(circle at 45% 40%, #e8392a 0%, #c0200e 40%, #8b0000 100%)',
          boxShadow: 'inset 0 6px 20px rgba(0,0,0,0.5), inset 0 -4px 12px rgba(200,0,0,0.3)',
        }}
      />

      {/* Gloss highlight – top-left white oval */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: '14%',
          left: '16%',
          width: '30%',
          height: '18%',
          background:
            'radial-gradient(ellipse, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)',
          transform: 'rotate(-20deg)',
        }}
      />

      {/* Dice layer – on top of inner bowl */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <DiceSet dice={dice} isRolling={isRolling} isHolding={isHolding} />
      </div>

      {/* Tap hint */}
      {!isRolling && !isHolding && !disabled && (
        <div className="absolute bottom-[12%] left-0 right-0 flex justify-center pointer-events-none z-20">
          <span className="text-white/40 text-sm">{tapHint}</span>
        </div>
      )}
    </div>
  );
}
