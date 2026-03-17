'use client';

import { useState, useCallback } from 'react';
import { ThemeType, ThemeConfig } from '@/types';
import { Locale, translations, Translations } from '@/lib/i18n';

export const ANIMATION_DURATIONS = [1, 2, 3, 5] as const;
export type AnimationDuration = (typeof ANIMATION_DURATIONS)[number];

const THEMES: Record<ThemeType, ThemeConfig> = {
  japanese: {
    name: '和風',
    bgClass: 'theme-japanese',
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
    bgClass: 'theme-casino',
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
    bgClass: 'theme-modern',
    bowlOuter: '#1f2937',
    bowlInner: '#4b5563',
    textClass: 'text-gray-900',
    accentClass: 'text-gray-700',
    overlayClass: 'bg-white/70 text-gray-800',
    indicatorActive: '#ef4444',
    indicatorInactive: '#3b82f6',
  },
};

export interface Settings {
  theme: ThemeType;
  locale: Locale;
  animationDuration: AnimationDuration;
}

export function useSettings() {
  const [theme, setTheme] = useState<ThemeType>('japanese');
  const [locale, setLocale] = useState<Locale>('ja');
  const [animationDuration, setAnimationDuration] = useState<AnimationDuration>(2);

  const cycleTheme = useCallback(() => {
    const order: ThemeType[] = ['japanese', 'casino', 'modern'];
    setTheme((prev) => {
      const idx = order.indexOf(prev);
      return order[(idx + 1) % order.length];
    });
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === 'ja' ? 'en' : 'ja'));
  }, []);

  const t: Translations = translations[locale];
  const config = THEMES[theme];

  return {
    theme,
    setTheme,
    cycleTheme,
    config,
    themes: THEMES,
    locale,
    setLocale,
    toggleLocale,
    t,
    animationDuration,
    setAnimationDuration,
  };
}
