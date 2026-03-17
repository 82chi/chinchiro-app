'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface NextTurnOverlayProps {
  overlayClass: string;
  onTap: () => void;
  nextTurnText: string;
  tapToContinueText: string;
}

export default function NextTurnOverlay({
  overlayClass,
  onTap,
  nextTurnText,
  tapToContinueText,
}: NextTurnOverlayProps) {
  return (
    <motion.div
      className={`fixed bottom-0 left-0 right-0 flex items-center justify-center z-50 cursor-pointer select-none py-20 ${overlayClass}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30, transition: { duration: 0.2, ease: 'easeIn' } }}
      transition={{ delay: 1.0, duration: 0.4, ease: 'easeOut' }}
      onPointerDown={onTap}
      style={{ willChange: 'opacity, transform' }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, type: 'spring', stiffness: 200, damping: 20 }}
        className="text-center"
      >
        <p className="text-4xl font-bold">{nextTurnText}</p>
        <p className="text-base mt-3 opacity-70">{tapToContinueText}</p>
      </motion.div>
    </motion.div>
  );
}