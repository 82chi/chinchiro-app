'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  rules: string;
  closeLabel: string;
  closeAriaLabel?: string;
}

export default function RulesModal({
  isOpen,
  onClose,
  title,
  rules,
  closeLabel,
  closeAriaLabel,
}: RulesModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ background: 'rgba(0,0,0,0.65)', willChange: 'opacity' }}
          onPointerDown={onClose}
        >
          <motion.div
            className="relative w-full max-w-sm rounded-2xl overflow-hidden"
            style={{
              background: '#fdf6e3',
              color: '#2a1a00',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
              maxHeight: '80vh',
            }}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
              style={{ borderColor: '#c9a96e' }}
            >
              <h2 className="text-xl font-bold">{title}</h2>
              <button
                onClick={onClose}
                className="text-2xl font-bold leading-none opacity-60 hover:opacity-100 transition-opacity"
                aria-label={closeAriaLabel ?? closeLabel}
              >
                {closeLabel}
              </button>
            </div>

            {/* Body */}
            <div
              className="px-5 py-4 overflow-y-auto"
              style={{ maxHeight: 'calc(80vh - 60px)' }}
            >
              <pre
                className="text-sm leading-7 whitespace-pre-wrap font-sans"
                style={{ color: '#2a1a00' }}
              >
                {rules}
              </pre>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
