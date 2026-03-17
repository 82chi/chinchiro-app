'use client';

import React, { useEffect, useRef } from 'react';
import { DiceValue } from '@/types';
import { motion, useAnimationControls } from 'framer-motion';

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

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function Dice({ value, isRolling, isHolding, index }: DiceProps) {
  const dots = DOT_POSITIONS[value];
  const controls = useAnimationControls();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isHolding || isRolling) {
      // Continuously animate to random positions while shaking
      const animate = () => {
        controls.start({
          x: randomRange(-18, 18),
          y: randomRange(-18, 18),
          rotate: randomRange(-30, 30),
          transition: { duration: 0.12 + index * 0.03, ease: 'easeInOut' },
        });
        timeoutRef.current = setTimeout(animate, 130 + index * 20);
      };
      animate();
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      controls.start({ x: 0, y: 0, rotate: 0, transition: { duration: 0.25 } });
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isHolding, isRolling, controls, index]);

  return (
    <motion.div
      animate={controls}
      style={{ willChange: 'transform' }}
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.4))' }}
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
        {/* Top-left highlight */}
        <rect
          x="4"
          y="4"
          width="92"
          height="40"
          rx="14"
          ry="14"
          fill="rgba(255,255,255,0.5)"
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
