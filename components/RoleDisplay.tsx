'use client';

import React, { useState, useEffect } from 'react';
import { RoleResult } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';

interface RoleDisplayProps {
  result: RoleResult | null;
  accentClass: string;
  textClass: string;
  labels?: {
    pinzoro?: string[];
    shigoro?: string;
    hifumi?: string[];
    buta?: string;
  };
}

function PinzoroDisplay({ accentClass, chars }: { accentClass: string; chars: string[] }) {
  const [visible, setVisible] = useState<number>(-1);

  useEffect(() => {
    setVisible(-1);
    const timers: ReturnType<typeof setTimeout>[] = [];
    chars.forEach((_, i) => {
      timers.push(setTimeout(() => setVisible(i), i * 1000));
    });
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex gap-2 justify-center">
      {chars.map((ch, i) => (
        <AnimatePresence key={i}>
          {visible >= i && (
            <motion.span
              initial={{ opacity: 0, scale: 0.4, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className={`text-6xl font-bold ${accentClass}`}
              style={{ willChange: 'transform, opacity' }}
            >
              {ch}
            </motion.span>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
}

function HifumiDisplay({ textClass, chars }: { textClass: string; chars: string[] }) {
  const [visible, setVisible] = useState<number>(-1);
  const interval = 2000 / 3;

  useEffect(() => {
    setVisible(-1);
    const timers: ReturnType<typeof setTimeout>[] = [];
    chars.forEach((_, i) => {
      timers.push(setTimeout(() => setVisible(i), i * interval));
    });
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex gap-2 justify-center">
      {chars.map((ch, i) => (
        <AnimatePresence key={i}>
          {visible >= i && (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`text-5xl font-bold ${textClass}`}
              style={{ willChange: 'transform, opacity' }}
            >
              {ch}
            </motion.span>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
}

function BigTextDisplay({ text, accentClass }: { text: string; accentClass: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`text-5xl font-bold ${accentClass}`}
      style={{ willChange: 'transform, opacity' }}
    >
      {text}
    </motion.div>
  );
}

function MeAriDisplay({ value, accentClass }: { value: number; accentClass: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 18 }}
      className={`text-9xl font-black ${accentClass}`}
      style={{ willChange: 'transform, opacity' }}
    >
      {value}
    </motion.div>
  );
}

function SimpleDisplay({ text, textClass }: { text: string; textClass: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`text-4xl font-semibold ${textClass}`}
    >
      {text}
    </motion.div>
  );
}

export default function RoleDisplay({ result, accentClass, textClass, labels }: RoleDisplayProps) {
  if (!result) return <div className="h-20" />;

  const pinzoroChars = labels?.pinzoro ?? ['ピ', 'ン', 'ゾ', 'ロ'];
  const shigoroText = labels?.shigoro ?? 'シゴロ';
  const hifumiChars = labels?.hifumi ?? ['ヒ', 'フ', 'ミ'];
  const butaText = labels?.buta ?? '豚';

  const renderContent = () => {
    switch (result.type) {
      case 'pinzoro':
        return <PinzoroDisplay accentClass={accentClass} chars={pinzoroChars} />;
      case 'shigoro':
        return <BigTextDisplay text={shigoroText} accentClass={accentClass} />;
      case 'arashi':
        return (
          <BigTextDisplay
            text={result.label}
            accentClass={accentClass}
          />
        );
      case 'me-ari':
        return <MeAriDisplay value={result.meValue!} accentClass={accentClass} />;
      case 'hifumi':
        return <HifumiDisplay textClass={textClass} chars={hifumiChars} />;
      case 'buta':
        return <SimpleDisplay text={butaText} textClass={textClass} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-20 py-2">
      <AnimatePresence mode="wait">
        <motion.div key={result.type + (result.meValue ?? '') + (result.arashiValue ?? '')}>
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
