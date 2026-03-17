'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LocaleType } from '@/types';
import { t } from '@/lib/i18n';

interface RulesModalProps {
  locale: LocaleType;
  textClass: string;
  accentClass: string;
}

export default function RulesModal({ locale, textClass, accentClass }: RulesModalProps) {
  const [open, setOpen] = useState(false);
  const tr = t(locale);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold border-2 border-current opacity-70 hover:opacity-100 active:scale-95 transition-all"
        aria-label={tr.ui.rules}
      >
        ？
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ willChange: 'opacity' }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="relative rounded-2xl p-6 w-full max-w-sm z-10 shadow-2xl overflow-y-auto"
              style={{ willChange: 'transform, opacity', backgroundColor: 'rgba(20,10,5,0.97)', maxHeight: '80vh' }}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-white/60 hover:text-white text-xl w-8 h-8 flex items-center justify-center rounded-full"
              >
                ×
              </button>

              <h2 className={`text-xl font-bold mb-1 text-amber-300`}>
                {tr.rules.title}
              </h2>
              <p className="text-white/70 text-sm mb-4">{tr.rules.desc}</p>

              <div className="space-y-2">
                {tr.rules.roles.map((role) => (
                  <div
                    key={role.name}
                    className="rounded-lg p-3 bg-white/5"
                  >
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className={`font-bold text-base ${accentClass}`}>{role.name}</span>
                      <span className="text-white/40 text-xs">{role.dice}</span>
                    </div>
                    <div className={`text-sm ${textClass} text-white/70 leading-snug`}>{role.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
