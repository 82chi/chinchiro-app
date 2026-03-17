'use client';

import { useState, useCallback } from 'react';
import { ThemeType, LocaleType, AnimDuration } from '@/types';

export interface Settings {
  theme: ThemeType;
  locale: LocaleType;
  animDuration: AnimDuration;
}

const DEFAULT_SETTINGS: Settings = {
  theme: 'japanese',
  locale: 'ja',
  animDuration: 2,
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  const setTheme = useCallback((theme: ThemeType) => {
    setSettings((prev) => ({ ...prev, theme }));
  }, []);

  const setLocale = useCallback((locale: LocaleType) => {
    setSettings((prev) => ({ ...prev, locale }));
  }, []);

  const setAnimDuration = useCallback((animDuration: AnimDuration) => {
    setSettings((prev) => ({ ...prev, animDuration }));
  }, []);

  return {
    settings,
    setTheme,
    setLocale,
    setAnimDuration,
  };
}
