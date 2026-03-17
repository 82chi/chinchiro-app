'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface NextTurnOverlayProps {
  overlayClass: string;
  onTap: () => void;
}

export default function NextTurnOverlay({ overlayClass, onTap }: NextTurnOverlayProps) {
  return (
    <motion.div
      className={`fixed inset-0 flex items-center justify-center z-50 ${overlayClass} cursor-pointer select-none`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onPointerDown={onTap}
      style={{ willChange: 'opacity' }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 20 }}
        className="text-center"
      >
        <p className="text-2xl font-bold">次の人へ</p>
        <p className="text-sm mt-2 opacity-70">タップして続ける</p>
      </motion.div>
    </motion.div>
  );
}
