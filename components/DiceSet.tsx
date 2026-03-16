'use client';

import React from 'react';
import { DiceValue } from '@/types';
import Dice from './Dice';

interface DiceSetProps {
  dice: [DiceValue, DiceValue, DiceValue];
  isRolling: boolean;
  isHolding: boolean;
}

export default function DiceSet({ dice, isRolling, isHolding }: DiceSetProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      {dice.map((value, index) => (
        <Dice
          key={index}
          value={value}
          isRolling={isRolling}
          isHolding={isHolding}
          index={index}
        />
      ))}
    </div>
  );
}
