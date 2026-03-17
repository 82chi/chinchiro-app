'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { DiceValue, GameState, AnimDuration } from '@/types';
import { evaluateRole, rollAllDice, isTurnEndingRole } from '@/lib/chinchiro';

const INITIAL_DICE: [DiceValue, DiceValue, DiceValue] = [1, 1, 1];

const INITIAL_STATE: GameState = {
  dice: INITIAL_DICE,
  rollCount: 0,
  isRolling: false,
  isHolding: false,
  roleResult: null,
  isTurnOver: false,
};

const TICK_INTERVAL_MS = 80;

export function useGame(animDuration: AnimDuration = 2) {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const animationRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stateRef = useRef<GameState>(INITIAL_STATE);
  const animDurationRef = useRef<AnimDuration>(animDuration);

  // Keep refs in sync
  stateRef.current = state;
  animDurationRef.current = animDuration;

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, []);

  const startHolding = useCallback(() => {
    const s = stateRef.current;
    if (s.isTurnOver || s.rollCount >= 3 || s.isRolling) return;
    setState((prev) => ({ ...prev, isHolding: true }));
  }, []);

  const stopHolding = useCallback(() => {
    if (!stateRef.current.isHolding) return;

    setState((prev) => ({ ...prev, isHolding: false, isRolling: true }));

    let ticks = 0;
    const maxTicks = Math.round((animDurationRef.current * 1000) / TICK_INTERVAL_MS);

    if (animationRef.current) clearInterval(animationRef.current);
    animationRef.current = setInterval(() => {
      ticks++;
      if (ticks < maxTicks) {
        setState((prev) => ({ ...prev, dice: rollAllDice() }));
      } else {
        if (animationRef.current) clearInterval(animationRef.current);
        const finalDice = rollAllDice();
        const result = evaluateRole(finalDice);
        setState((prev) => {
          const newRollCount = prev.rollCount + 1;
          const turnOver = newRollCount >= 3 || isTurnEndingRole(result);
          return {
            ...prev,
            dice: finalDice,
            rollCount: newRollCount,
            isRolling: false,
            roleResult: result,
            isTurnOver: turnOver,
          };
        });
      }
    }, TICK_INTERVAL_MS);
  }, []);

  const nextTurn = useCallback(() => {
    if (!stateRef.current.isTurnOver) return;
    if (animationRef.current) clearInterval(animationRef.current);
    setState({ ...INITIAL_STATE });
  }, []);

  return {
    state,
    startHolding,
    stopHolding,
    nextTurn,
  };
}

