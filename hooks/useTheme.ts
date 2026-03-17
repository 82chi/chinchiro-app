'use client';

import { ThemeType, ThemeConfig } from '@/types';

export const THEME_CONFIGS: Record<ThemeType, ThemeConfig> = {
  japanese: {
    name: '和風',
    bgClass: 'bg-tatami',
    bowlOuter: '#1a0a00',
    bowlInner: '#8b0000',
    textClass: 'text-stone-900',
    accentClass: 'text-red-800',
    overlayClass: 'bg-stone-950/60 text-amber-100',
    // 和風: 落ち着いた抹茶グリーン（active）× 枯草色（inactive）
    indicatorActive: '#6b8f5e',
    indicatorInactive: '#b5a07a',
  },
  casino: {
    name: 'カジノ',
    bgClass: 'bg-emerald-900',
    bowlOuter: '#1a1a0a',
    bowlInner: '#2d4a1e',
    textClass: 'text-yellow-100',
    accentClass: 'text-yellow-400',
    overlayClass: 'bg-emerald-950/70 text-yellow-200',
    // カジノ: ソフトなゴールド（active）× ダークグリーン（inactive）
    indicatorActive: '#c9a84c',
    indicatorInactive: '#3d6b4f',
  },
  modern: {
    name: 'モダン',
    bgClass: 'bg-gray-100',
    bowlOuter: '#1f2937',
    bowlInner: '#4b5563',
    textClass: 'text-gray-900',
    accentClass: 'text-gray-700',
    overlayClass: 'bg-white/70 text-gray-800',
    // モダン: スレートブルー（active）× ライトグレー（inactive）
    indicatorActive: '#5b8fa8',
    indicatorInactive: '#9ca3af',
  },
};

export function useTheme(theme: ThemeType = 'japanese') {
  return {
    config: THEME_CONFIGS[theme],
    themes: THEME_CONFIGS,
  };
}