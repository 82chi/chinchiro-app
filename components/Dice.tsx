'use client';

import React from 'react';
import { DiceValue } from '@/types';
import { motion } from 'framer-motion';

interface DiceProps {
  value: DiceValue;
  isRolling: boolean;
  /** Whether bowl is being held (random shake handled by DiceSet) */
  isHolding: boolean;
  index: number;
  /** Random offset X for shake animation */
  shakeX?: number;
  /** Random offset Y for shake animation */
  shakeY?: number;
  /** Random rotation for shake animation */
  shakeRotate?: number;
}

const DOT_POSITIONS: Record<DiceValue, { cx: number; cy: number; red?: boolean }[]> = {
  1: [{ cx: 50, cy: 50, red: true }],
  2: [
    { cx: 28, cy: 28 },
    { cx: 72, cy: 72 },
  ],
  3: [
    { cx: 28, cy: 28 },
    { cx: 50, cy: 50 },
    { cx: 72, cy: 72 },
  ],
  4: [
    { cx: 28, cy: 28 },
    { cx: 72, cy: 28 },
    { cx: 28, cy: 72 },
    { cx: 72, cy: 72 },
  ],
  5: [
    { cx: 28, cy: 28 },
    { cx: 72, cy: 28 },
    { cx: 50, cy: 50 },
    { cx: 28, cy: 72 },
    { cx: 72, cy: 72 },
  ],
  6: [
    { cx: 28, cy: 22 },
    { cx: 72, cy: 22 },
    { cx: 28, cy: 50 },
    { cx: 72, cy: 50 },
    { cx: 28, cy: 78 },
    { cx: 72, cy: 78 },
  ],
};

export default function Dice({
  value,
  isRolling,
  isHolding,
  index,
  shakeX = 0,
  shakeY = 0,
  shakeRotate = 0,
}: DiceProps) {
  const dots = DOT_POSITIONS[value];

  return (
    <motion.div
      className="relative"
      style={{ willChange: 'transform' }}
      animate={
        isHolding
          ? { x: shakeX, y: shakeY, rotate: shakeRotate }
          : isRolling
          ? {
              rotate: [0, -15 + index * 10, 20 - index * 5, -10, 5, 0],
              x: [0, -4 + index * 3, 6 - index * 2, -3, 2, 0],
              y: [0, 3 - index * 2, -4 + index, 2, -1, 0],
            }
          : { rotate: 0, x: 0, y: 0 }
      }
      transition={
        isHolding
          ? { duration: 0.3, ease: 'easeInOut' }
          : isRolling
          ? { duration: 0.4, repeat: 0, ease: 'easeInOut' }
          : { duration: 0.2 }
      }
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}
      >
        {/* Dice body */}
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="14"
          ry="14"
          fill="white"
          stroke="#d1d5db"
          strokeWidth="2"
        />
        {/* Light gloss on top-left */}
        <ellipse cx="28" cy="20" rx="18" ry="8" fill="rgba(255,255,255,0.5)" />
        {/* Dots */}
        {dots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.cx}
            cy={dot.cy}
            r="9"
            fill={dot.red ? '#dc2626' : '#1f2937'}
          />
        ))}
      </svg>
    </motion.div>
  );
}
