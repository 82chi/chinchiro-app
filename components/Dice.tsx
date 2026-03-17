'use client';

import React, { useEffect, useRef } from 'react';
import { DiceValue } from '@/types';
import { motion, useAnimationControls } from 'framer-motion';

interface DiceProps {
  value: DiceValue;
  isRolling: boolean;
  isHolding: boolean;
  index: number;
  posX: number;
  posY: number;
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

const BASE_ROTATION_SPEED = 4;
const ROTATION_SPEED_INCREMENT = 1.5;

export default function Dice({ value, isRolling, isHolding, index, posX, posY }: DiceProps) {
  const dots = DOT_POSITIONS[value];
  const controls = useAnimationControls();
  const rotateRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Self-managed rotation for rolling feel
  useEffect(() => {
    const isActive = isHolding || isRolling;

    if (isActive) {
      // Spin at a per-dice speed to look independent
      const speed = BASE_ROTATION_SPEED + index * ROTATION_SPEED_INCREMENT;
      const spin = () => {
        rotateRef.current += speed;
        controls.set({ rotate: rotateRef.current });
        rafRef.current = requestAnimationFrame(spin);
      };
      rafRef.current = requestAnimationFrame(spin);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      controls.start({ rotate: 0, transition: { duration: 0.4, ease: 'easeOut' } });
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isHolding, isRolling, controls, index]);

  return (
    <motion.div
      animate={controls}
      style={{
        x: posX,
        y: posY,
        willChange: 'transform',
      }}
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
