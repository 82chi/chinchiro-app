'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface NextTurnOverlayProps {
  onTap: () => void;
  nextPlayerText?: string;
  tapToContinueText?: string;
}

export default function NextTurnOverlay({
  onTap,
  nextPlayerText = '次の人へ',
  tapToContinueText = 'タップして続ける',
}: NextTurnOverlayProps) {
  return (
    <motion.div
      className={`fixed bottom-0 left-0 right-0 flex items-center justify-center z-50 cursor-pointer select-none py-8`}
      style={{
        background: 'rgba(0,0,0,0.5)',
        willChange: 'opacity',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeIn', delay: 2.5 }}
      onPointerDown={onTap}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3.1, type: 'spring', stiffness: 200, damping: 20 }}
        className="text-center px-8 py-6"
      >
        <p className={`text-3xl font-bold text-white`}>{nextPlayerText}</p>
        <p className="text-base mt-2 text-white/70">{tapToContinueText}</p>
      </motion.div>
    </motion.div>
  );
}
