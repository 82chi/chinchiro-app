'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DiceValue } from '@/types';
import Dice from './Dice';

interface DiceSetProps {
  dice: [DiceValue, DiceValue, DiceValue];
  isRolling: boolean;
  isHolding: boolean;
}

// 10 preset resting layouts — all guaranteed non-overlapping (dice are 80px wide)
// Coordinates are relative to bowl center (px). Min separation ~90px.
const REST_LAYOUTS: Array<[{ x: number; y: number }, { x: number; y: number }, { x: number; y: number }]> = [
  // Row: left / center / right
  [{ x: -88, y: 0 }, { x: 0, y: 0 }, { x: 88, y: 0 }],
  // Triangle: top / bottom-left / bottom-right
  [{ x: 0, y: -55 }, { x: -55, y: 40 }, { x: 55, y: 40 }],
  // Inverted triangle
  [{ x: 0, y: 55 }, { x: -55, y: -40 }, { x: 55, y: -40 }],
  // Diagonal top-left to bottom-right
  [{ x: -80, y: -40 }, { x: 0, y: 0 }, { x: 80, y: 40 }],
  // Diagonal top-right to bottom-left
  [{ x: 80, y: -40 }, { x: 0, y: 0 }, { x: -80, y: 40 }],
  // L-shape
  [{ x: -80, y: -35 }, { x: -80, y: 55 }, { x: 10, y: 55 }],
  // Spread wide
  [{ x: -90, y: -20 }, { x: 0, y: 50 }, { x: 90, y: -20 }],
  // Column (vertical)
  [{ x: 0, y: -88 }, { x: 0, y: 0 }, { x: 0, y: 88 }],
  // Cluster upper-left
  [{ x: -60, y: -55 }, { x: 30, y: -55 }, { x: -15, y: 35 }],
  // Cluster lower-right
  [{ x: 60, y: 55 }, { x: -30, y: 55 }, { x: 15, y: -35 }],
];

function pickRestLayout() {
  return REST_LAYOUTS[Math.floor(Math.random() * REST_LAYOUTS.length)];
}

const BOWL_RADIUS = 110;
const MAX_SPEED = 22;          // 2.5× faster than before (was 9)
const IMPULSE_INTERVAL = 10;   // more frequent impulses (was 18)
const IMPULSE_STAGGER = 3;

interface PhysicsState {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function DiceSet({ dice, isRolling, isHolding }: DiceSetProps) {
  const restLayoutRef = useRef(pickRestLayout());

  const physicsRef = useRef<PhysicsState[]>(
    restLayoutRef.current.map(p => ({ ...p, vx: 0, vy: 0 }))
  );
  const [positions, setPositions] = useState<Array<{ x: number; y: number }>>(
    restLayoutRef.current.map(p => ({ x: p.x, y: p.y }))
  );
  const rafRef = useRef<number | null>(null);
  const isActiveRef = useRef(false);
  const prevActiveRef = useRef(false);
  const frameCountRef = useRef(0);

  useEffect(() => {
    const isActive = isHolding || isRolling;

    if (isActive && !prevActiveRef.current) {
      // Kick off: assign each dice a different random initial velocity (fast!)
      physicsRef.current = physicsRef.current.map((s, i) => {
        const angle = (Math.PI * 2 * i) / dice.length + (Math.random() - 0.5) * Math.PI;
        const speed = 10 + Math.random() * 8; // fast initial kick
        return {
          x: s.x,
          y: s.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        };
      });
      frameCountRef.current = 0;
    }

    if (!isActive && prevActiveRef.current) {
      // Pick a new random rest layout each time rolling stops
      restLayoutRef.current = pickRestLayout();
    }

    prevActiveRef.current = isActive;
    isActiveRef.current = isActive;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (!isActive) {
      const targetLayout = restLayoutRef.current;
      // Smoothly return each dice to its chosen resting position
      const animateToRest = () => {
        let stillMoving = false;
        physicsRef.current = physicsRef.current.map((s, i) => {
          const tx = targetLayout[i].x;
          const ty = targetLayout[i].y;
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
          physicsRef.current = targetLayout.map(p => ({ ...p, vx: 0, vy: 0 }));
          setPositions(targetLayout.map(p => ({ x: p.x, y: p.y })));
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

        // Apply a strong random impulse periodically per dice (staggered frames)
        if (frame % IMPULSE_INTERVAL === (i * IMPULSE_STAGGER) % IMPULSE_INTERVAL) {
          const angle = Math.random() * Math.PI * 2;
          const force = 2.5 + Math.random() * 4.5; // stronger impulse (was 0.8–2.4)
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
          vx *= 0.88;
          vy *= 0.88;
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