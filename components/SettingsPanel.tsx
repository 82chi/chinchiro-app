'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeType, LocaleType, AnimDuration } from '@/types';
import { t } from '@/lib/i18n';

interface SettingsPanelProps {
  theme: ThemeType;
  locale: LocaleType;
  animDuration: AnimDuration;
  onThemeChange: (theme: ThemeType) => void;
  onLocaleChange: (locale: LocaleType) => void;
  onAnimDurationChange: (duration: AnimDuration) => void;
  disabled: boolean;
}

const THEMES: ThemeType[] = ['japanese', 'casino', 'modern'];
const ANIM_DURATIONS: AnimDuration[] = [1, 2, 3, 5];

export default function SettingsPanel({
  theme,
  locale,
  animDuration,
  onThemeChange,
  onLocaleChange,
  onAnimDurationChange,
  disabled,
}: SettingsPanelProps) {
  const [open, setOpen] = useState(false);
  const tr = t(locale);

  const themeLabels: Record<ThemeType, string> = {
    japanese: tr.ui.japanese,
    casino: tr.ui.casino,
    modern: tr.ui.modern,
  };

  const durationLabels: Record<AnimDuration, string> = {
    1: tr.ui.oneSecond,
    2: tr.ui.twoSeconds,
    3: tr.ui.threeSeconds,
    5: tr.ui.fiveSeconds,
  };

  return (
    <>
      {/* Gear button */}
      <button
        onClick={disabled ? undefined : () => setOpen(true)}
        disabled={disabled}
        className={`w-9 h-9 rounded-full flex items-center justify-center text-xl transition-opacity ${
          disabled ? 'opacity-30 cursor-not-allowed' : 'opacity-70 hover:opacity-100 active:scale-95'
        }`}
        aria-label={tr.ui.settings}
      >
        ⚙️
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ willChange: 'opacity' }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
            />

            {/* Panel content */}
            <motion.div
              className="relative rounded-2xl p-5 w-64 z-10 shadow-2xl"
              style={{ backgroundColor: 'rgba(15,8,3,0.97)' }}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-white/60 hover:text-white text-xl w-8 h-8 flex items-center justify-center rounded-full"
              >
                ×
              </button>

              <h2 className="text-white font-bold text-base mb-4">{tr.ui.settings}</h2>

              {/* Theme */}
              <div className="mb-4">
                <p className="text-white/60 text-xs mb-2 uppercase tracking-wide">{tr.ui.theme}</p>
                <div className="flex flex-col gap-1">
                  {THEMES.map((th) => (
                    <button
                      key={th}
                      onClick={() => { onThemeChange(th); }}
                      className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        theme === th
                          ? 'bg-amber-600 text-white font-semibold'
                          : 'text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {themeLabels[th]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div className="mb-4">
                <p className="text-white/60 text-xs mb-2 uppercase tracking-wide">{tr.ui.language}</p>
                <div className="flex gap-2">
                  {(['ja', 'en'] as LocaleType[]).map((loc) => (
                    <button
                      key={loc}
                      onClick={() => onLocaleChange(loc)}
                      className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                        locale === loc
                          ? 'bg-amber-600 text-white font-semibold'
                          : 'text-white/70 hover:bg-white/10 border border-white/20'
                      }`}
                    >
                      {loc === 'ja' ? '日本語' : 'English'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Animation Duration */}
              <div>
                <p className="text-white/60 text-xs mb-2 uppercase tracking-wide">{tr.ui.animDuration}</p>
                <div className="grid grid-cols-4 gap-1">
                  {ANIM_DURATIONS.map((d) => (
                    <button
                      key={d}
                      onClick={() => onAnimDurationChange(d)}
                      className={`py-2 rounded-lg text-xs transition-colors ${
                        animDuration === d
                          ? 'bg-amber-600 text-white font-semibold'
                          : 'text-white/70 hover:bg-white/10 border border-white/20'
                      }`}
                    >
                      {durationLabels[d]}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
