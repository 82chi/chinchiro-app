'use client';

import { useState, useCallback } from 'react';
import { LocaleType } from '@/types';

export function useLocale(initial: LocaleType = 'ja') {
  const [locale, setLocale] = useState<LocaleType>(initial);
  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === 'ja' ? 'en' : 'ja'));
  }, []);
  return { locale, setLocale, toggleLocale };
}
