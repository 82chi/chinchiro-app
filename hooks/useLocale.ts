'use client';

import { useState, useCallback } from 'react';
import { Locale, translations, Translations } from '@/lib/i18n';

export function useLocale() {
  const [locale, setLocale] = useState<Locale>('ja');

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === 'ja' ? 'en' : 'ja'));
  }, []);

  const t: Translations = translations[locale];

  return { locale, toggleLocale, t };
}
