'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DiceValue } from '@/types';
import Dice from './Dice';

interface DiceSetProps {
  dice: [DiceValue, DiceValue, DiceValue];
  isRolling: boolean;
  isHolding: boolean;
}

// Initial resting positions (relative to bowl center, in px)
const INITIAL_POSITIONS = [
  { x: -55, y: 0 },
  { x: 0, y: 0 },
  { x: 55, y: 0 },
];

// Effective radius for dice centers inside the bowl
// Bowl inner circle is ~86% of outer; usable radius ~40% of outer (400px max → ~160px),
// minus half dice size (40px) = ~120px
const BOWL_RADIUS = 110;
const MAX_SPEED = 9;
// How often (in frames) a random impulse is applied to each dice
const IMPULSE_INTERVAL = 18;
// Frame offset between dice so impulses are staggered
const IMPULSE_STAGGER = 6;

interface PhysicsState {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function DiceSet({ dice, isRolling, isHolding }: DiceSetProps) {
  const physicsRef = useRef<PhysicsState[]>(
    INITIAL_POSITIONS.map(p => ({ ...p, vx: 0, vy: 0 }))
  );
  const [positions, setPositions] = useState(INITIAL_POSITIONS);
  const rafRef = useRef<number | null>(null);
  const isActiveRef = useRef(false);
  const prevActiveRef = useRef(false);
  const frameCountRef = useRef(0);

  useEffect(() => {
    const isActive = isHolding || isRolling;

    if (isActive && !prevActiveRef.current) {
      // Kick off: assign each dice a different random initial velocity
      physicsRef.current = physicsRef.current.map((s, i) => {
        const angle = (Math.PI * 2 * i) / dice.length + (Math.random() - 0.5) * Math.PI;
        const speed = 4 + Math.random() * 3;
        return {
          x: s.x,
          y: s.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        };
      });
      frameCountRef.current = 0;
    }

    prevActiveRef.current = isActive;
    isActiveRef.current = isActive;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (!isActive) {
      // Smoothly return each dice to its initial resting position
      const animateToRest = () => {
        let stillMoving = false;
        physicsRef.current = physicsRef.current.map((s, i) => {
          const tx = INITIAL_POSITIONS[i].x;
          const ty = INITIAL_POSITIONS[i].y;
          const dx = tx - s.x;
          const dy = ty - s.y;
          if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) {
            stillMoving = true;
          }
          return { x: s.x + dx * 0.18, y: s.y + dy * 0.18, vx: 0, vy: 0 };
        });
        setPositions(physicsRef.current.map(s => ({ x: s.x, y: s.y })));
        if (stillMoving) {
          rafRef.current = requestAnimationFrame(animateToRest);
        } else {
          physicsRef.current = INITIAL_POSITIONS.map(p => ({ ...p, vx: 0, vy: 0 }));
          setPositions([...INITIAL_POSITIONS]);
          rafRef.current = null;
        }
      };
      rafRef.current = requestAnimationFrame(animateToRest);
      return;
    }

    // Physics loop while active (holding or rolling)
    const loop = () => {
      if (!isActiveRef.current) return;
      frameCountRef.current++;
      const frame = frameCountRef.current;

      physicsRef.current = physicsRef.current.map((s, i) => {
        let { x, y, vx, vy } = s;

        // Apply a random impulse periodically per dice (staggered frames)
        if (frame % IMPULSE_INTERVAL === (i * IMPULSE_STAGGER) % IMPULSE_INTERVAL) {
          const angle = Math.random() * Math.PI * 2;
          const force = 0.8 + Math.random() * 1.6;
          vx += Math.cos(angle) * force;
          vy += Math.sin(angle) * force;
        }

        // Update position
        x += vx;
        y += vy;

        // Circular bowl boundary — reflect velocity off the wall
        const dist = Math.sqrt(x * x + y * y);
        if (dist > BOWL_RADIUS) {
          const nx = x / dist;
          const ny = y / dist;
          const dot = vx * nx + vy * ny;
          vx -= 2 * dot * nx;
          vy -= 2 * dot * ny;
          // Restitution: slight energy loss on bounce
          vx *= 0.85;
          vy *= 0.85;
          // Push back inside the wall
          x = nx * BOWL_RADIUS;
          y = ny * BOWL_RADIUS;
        }

        // Clamp speed
        const speed = Math.sqrt(vx * vx + vy * vy);
        if (speed > MAX_SPEED) {
          vx = (vx / speed) * MAX_SPEED;
          vy = (vy / speed) * MAX_SPEED;
        }

        return { x, y, vx, vy };
      });

      setPositions(physicsRef.current.map(s => ({ x: s.x, y: s.y })));
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isHolding, isRolling]);

  return (
    <div className="absolute inset-0">
      {dice.map((value, index) => (
        <div
          key={index}
          className="absolute"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <Dice
            value={value}
            isRolling={isRolling}
            isHolding={isHolding}
            index={index}
            posX={positions[index].x}
            posY={positions[index].y}
          />
        </div>
      ))}
    </div>
  );
}
