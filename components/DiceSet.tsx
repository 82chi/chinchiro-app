'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DiceValue } from '@/types';
import Dice from './Dice';

interface DiceSetProps {
  dice: [DiceValue, DiceValue, DiceValue];
  isRolling: boolean;
  isHolding: boolean;
}

interface ShakeState {
  x: number;
  y: number;
  rotate: number;
}

function randomShake(amplitude = 28): ShakeState {
  return {
    x: (Math.random() - 0.5) * amplitude * 2,
    y: (Math.random() - 0.5) * amplitude * 2,
    rotate: (Math.random() - 0.5) * 40,
  };
}

const ZERO_SHAKE: ShakeState = { x: 0, y: 0, rotate: 0 };

export default function DiceSet({ dice, isRolling, isHolding }: DiceSetProps) {
  const [shakes, setShakes] = useState<[ShakeState, ShakeState, ShakeState]>([
    ZERO_SHAKE,
    ZERO_SHAKE,
    ZERO_SHAKE,
  ]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isHolding) {
      // Randomise positions every 300ms; first tick at 0ms
      const tick = () => setShakes([randomShake(), randomShake(), randomShake()]);
      const id0 = setTimeout(tick, 0);
      intervalRef.current = setInterval(tick, 300);
      return () => {
        clearTimeout(id0);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      const id = setTimeout(() => setShakes([ZERO_SHAKE, ZERO_SHAKE, ZERO_SHAKE]), 0);
      return () => clearTimeout(id);
    }
  }, [isHolding]);

  return (
    <div className="flex items-center justify-center gap-2">
      {dice.map((value, index) => (
        <Dice
          key={index}
          value={value}
          isRolling={isRolling}
          isHolding={isHolding}
          index={index}
          shakeX={shakes[index].x}
          shakeY={shakes[index].y}
          shakeRotate={shakes[index].rotate}
        />
      ))}
    </div>
  );
}
