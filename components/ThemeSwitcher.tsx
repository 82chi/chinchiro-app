'use client';

import React from 'react';
import { ThemeType } from '@/types';

interface ThemeSwitcherProps {
  theme: ThemeType;
  onCycle: () => void;
  disabled: boolean;
}

const THEME_ICONS: Record<ThemeType, string> = {
  japanese: '🏮',
  casino: '🃏',
  modern: '⬜',
};

const THEME_LABELS: Record<ThemeType, string> = {
  japanese: '和風',
  casino: 'カジノ',
  modern: 'モダン',
};

export default function ThemeSwitcher({ theme, onCycle, disabled }: ThemeSwitcherProps) {
  return (
    <button
      onClick={disabled ? undefined : onCycle}
      disabled={disabled}
      className={`flex flex-col items-center gap-0.5 p-2 rounded-lg transition-opacity ${
        disabled ? 'opacity-30 cursor-not-allowed' : 'opacity-80 hover:opacity-100 active:scale-95'
      }`}
      aria-label="テーマ切り替え"
      title={`テーマ: ${THEME_LABELS[theme]}`}
    >
      <span className="text-xl">{THEME_ICONS[theme]}</span>
      <span className="text-xs font-medium">{THEME_LABELS[theme]}</span>
    </button>
  );
}
