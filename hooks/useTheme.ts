'use client';

import { useState, useCallback } from 'react';
import { ThemeType, ThemeConfig } from '@/types';

const THEMES: Record<ThemeType, ThemeConfig> = {
  japanese: {
    name: '和風',
    bgClass: 'bg-stone-900',
    bowlOuter: '#1a0a00',
    bowlInner: '#8b0000',
    textClass: 'text-amber-100',
    accentClass: 'text-amber-400',
    overlayClass: 'bg-stone-950/70 text-amber-200',
    indicatorActive: '#ef4444',
    indicatorInactive: '#3b82f6',
  },
  casino: {
    name: 'カジノ',
    bgClass: 'bg-emerald-900',
    bowlOuter: '#1a1a0a',
    bowlInner: '#2d4a1e',
    textClass: 'text-yellow-100',
    accentClass: 'text-yellow-400',
    overlayClass: 'bg-emerald-950/70 text-yellow-200',
    indicatorActive: '#ef4444',
    indicatorInactive: '#3b82f6',
  },
  modern: {
    name: 'モダン',
    bgClass: 'bg-gray-100',
    bowlOuter: '#1f2937',
    bowlInner: '#4b5563',
    textClass: 'text-gray-900',
    accentClass: 'text-gray-700',
    overlayClass: 'bg-white/70 text-gray-800',
    indicatorActive: '#ef4444',
    indicatorInactive: '#3b82f6',
  },
};

const THEME_ORDER: ThemeType[] = ['japanese', 'casino', 'modern'];

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('japanese');

  const cycleTheme = useCallback(() => {
    setCurrentTheme((prev) => {
      const idx = THEME_ORDER.indexOf(prev);
      return THEME_ORDER[(idx + 1) % THEME_ORDER.length];
    });
  }, []);

  return {
    theme: currentTheme,
    config: THEMES[currentTheme],
    cycleTheme,
    themes: THEMES,
  };
}
