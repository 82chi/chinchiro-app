'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeType } from '@/types';
import { Locale } from '@/lib/i18n';
import { ANIMATION_DURATIONS, AnimationDuration } from '@/hooks/useSettings';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeType;
  setTheme: (t: ThemeType) => void;
  locale: Locale;
  toggleLocale: () => void;
  animationDuration: AnimationDuration;
  setAnimationDuration: (d: AnimationDuration) => void;
  labels: {
    settings: string;
    theme: string;
    language: string;
    animationDuration: string;
    themes: { japanese: string; casino: string; modern: string };
    seconds: (n: number) => string;
    closeAriaLabel?: string;
  };
}

export default function SettingsPanel({
  isOpen,
  onClose,
  theme,
  setTheme,
  locale,
  toggleLocale,
  animationDuration,
  setAnimationDuration,
  labels,
}: SettingsPanelProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('settings-open');
    } else {
      document.body.classList.remove('settings-open');
    }
    return () => document.body.classList.remove('settings-open');
  }, [isOpen]);

  const themes: ThemeType[] = ['japanese', 'casino', 'modern'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ background: 'rgba(0,0,0,0.55)', willChange: 'opacity' }}
          onPointerDown={onClose}
        >
          <motion.div
            className="w-full max-w-md rounded-t-3xl overflow-hidden"
            style={{
              background: '#1c1a18',
              color: '#fef3c7',
              boxShadow: '0 -4px 40px rgba(0,0,0,0.6)',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1.5 rounded-full bg-white/20" />
            </div>

            {/* Title */}
            <div className="flex items-center justify-between px-6 pb-4 pt-2">
              <h2 className="text-lg font-bold text-amber-200">⚙️ {labels.settings}</h2>
              <button
                onClick={onClose}
                className="text-xl opacity-60 hover:opacity-100 transition-opacity"
                aria-label={labels.closeAriaLabel ?? '閉じる'}
              >
                ✕
              </button>
            </div>

            <div className="px-6 pb-8 space-y-6">
              {/* Theme */}
              <div>
                <p className="text-sm font-semibold text-amber-300/80 mb-2 uppercase tracking-wider">
                  {labels.theme}
                </p>
                <div className="flex gap-2">
                  {themes.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className="flex-1 py-2 rounded-xl text-sm font-medium transition-all"
                      style={{
                        background:
                          theme === t
                            ? 'rgba(251,191,36,0.25)'
                            : 'rgba(255,255,255,0.07)',
                        border:
                          theme === t
                            ? '1.5px solid rgba(251,191,36,0.7)'
                            : '1.5px solid transparent',
                        color: theme === t ? '#fbbf24' : '#9ca3af',
                      }}
                    >
                      {labels.themes[t]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <p className="text-sm font-semibold text-amber-300/80 mb-2 uppercase tracking-wider">
                  {labels.language}
                </p>
                <div className="flex gap-2">
                  {(['ja', 'en'] as Locale[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        if (locale !== l) toggleLocale();
                      }}
                      className="flex-1 py-2 rounded-xl text-sm font-medium transition-all"
                      style={{
                        background:
                          locale === l
                            ? 'rgba(251,191,36,0.25)'
                            : 'rgba(255,255,255,0.07)',
                        border:
                          locale === l
                            ? '1.5px solid rgba(251,191,36,0.7)'
                            : '1.5px solid transparent',
                        color: locale === l ? '#fbbf24' : '#9ca3af',
                      }}
                    >
                      {l === 'ja' ? '日本語' : 'English'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Animation Duration */}
              <div>
                <p className="text-sm font-semibold text-amber-300/80 mb-2 uppercase tracking-wider">
                  {labels.animationDuration}
                </p>
                <div className="flex gap-2">
                  {ANIMATION_DURATIONS.map((d) => (
                    <button
                      key={d}
                      onClick={() => setAnimationDuration(d)}
                      className="flex-1 py-2 rounded-xl text-sm font-medium transition-all"
                      style={{
                        background:
                          animationDuration === d
                            ? 'rgba(251,191,36,0.25)'
                            : 'rgba(255,255,255,0.07)',
                        border:
                          animationDuration === d
                            ? '1.5px solid rgba(251,191,36,0.7)'
                            : '1.5px solid transparent',
                        color: animationDuration === d ? '#fbbf24' : '#9ca3af',
                      }}
                    >
                      {labels.seconds(d)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
