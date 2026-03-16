'use client';

import React from 'react';
import { DiceValue } from '@/types';
import { motion } from 'framer-motion';

interface DiceProps {
  value: DiceValue;
  isRolling: boolean;
  isHolding: boolean;
  index: number;
}

const DOT_POSITIONS: Record<DiceValue, { cx: number; cy: number; red?: boolean }[]> = {
  1: [{ cx: 50, cy: 50, red: true }],
  2: [
    { cx: 25, cy: 25 },
    { cx: 75, cy: 75 },
  ],
  3: [
    { cx: 25, cy: 25 },
    { cx: 50, cy: 50 },
    { cx: 75, cy: 75 },
  ],
  4: [
    { cx: 25, cy: 25 },
    { cx: 75, cy: 25 },
    { cx: 25, cy: 75 },
    { cx: 75, cy: 75 },
  ],
  5: [
    { cx: 25, cy: 25 },
    { cx: 75, cy: 25 },
    { cx: 50, cy: 50 },
    { cx: 25, cy: 75 },
    { cx: 75, cy: 75 },
  ],
  6: [
    { cx: 25, cy: 20 },
    { cx: 75, cy: 20 },
    { cx: 25, cy: 50 },
    { cx: 75, cy: 50 },
    { cx: 25, cy: 80 },
    { cx: 75, cy: 80 },
  ],
};

export default function Dice({ value, isRolling, isHolding, index }: DiceProps) {
  const dots = DOT_POSITIONS[value];

  return (
    <motion.div
      className="relative"
      style={{ willChange: 'transform' }}
      animate={
        isRolling || isHolding
          ? {
              rotate: [0, -15 + index * 10, 20 - index * 5, -10, 5, 0],
              x: [0, -4 + index * 3, 6 - index * 2, -3, 2, 0],
              y: [0, 3 - index * 2, -4 + index, 2, -1, 0],
            }
          : { rotate: 0, x: 0, y: 0 }
      }
      transition={
        isRolling || isHolding
          ? {
              duration: 0.4,
              repeat: isHolding ? Infinity : 0,
              ease: 'easeInOut',
            }
          : { duration: 0.2 }
      }
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 100 100"
        className="drop-shadow-md"
      >
        {/* Dice body */}
        <rect
          x="5"
          y="5"
          width="90"
          height="90"
          rx="12"
          ry="12"
          fill="white"
          stroke="#d1d5db"
          strokeWidth="2"
        />
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
