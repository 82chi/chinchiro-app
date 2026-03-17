'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGame } from '@/hooks/useGame';
import { useSettings } from '@/hooks/useSettings';
import Bowl from '@/components/Bowl';
import CountIndicator from '@/components/CountIndicator';
import RoleDisplay from '@/components/RoleDisplay';
import NextTurnOverlay from '@/components/NextTurnOverlay';
import SettingsPanel from '@/components/SettingsPanel';
import RulesModal from '@/components/RulesModal';

export default function Home() {
  const {
    theme,
    setTheme,
    config,
    locale,
    toggleLocale,
    t,
    animationDuration,
    setAnimationDuration,
  } = useSettings();

  const { state, startHolding, stopHolding, nextTurn } = useGame(
    animationDuration * 1000
  );

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);

  const isAnimating = state.isRolling || state.isHolding;

  const roleLabels = {
    pinzoro: locale === 'ja' ? ['ピ', 'ン', 'ゾ', 'ロ'] : ['P', 'i', 'n', '!'],
    shigoro: t.shigoro,
    hifumi: locale === 'ja' ? ['ヒ', 'フ', 'ミ'] : ['H', 'i', '!'],
    buta: t.buta,
  };

  return (
    <main
      className={`relative flex flex-col min-h-screen ${config.bgClass} ${config.textClass} transition-colors duration-500`}
    >
      {/* Top bar */}
      <div className="relative flex items-center justify-between pt-4 px-4">
        {/* Rules button – left */}
        <button
          onClick={() => setRulesOpen(true)}
          className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold opacity-70 hover:opacity-100 transition-opacity"
          style={{ background: 'rgba(0,0,0,0.25)', color: '#fff' }}
          aria-label={t.rulesAriaLabel}
        >
          {t.rulesButton}
        </button>

        {/* Settings button – right */}
        <button
          onClick={() => !isAnimating && setSettingsOpen(true)}
          disabled={isAnimating}
          className={`w-9 h-9 rounded-full flex items-center justify-center text-lg transition-opacity ${
            isAnimating ? 'opacity-30 cursor-not-allowed' : 'opacity-70 hover:opacity-100'
          }`}
          style={{ background: 'rgba(0,0,0,0.25)', color: '#fff' }}
          aria-label={t.settingsAriaLabel}
        >
          ⚙️
        </button>
      </div>

      {/* Count indicator – no title */}
      <CountIndicator
        rollCount={state.rollCount}
        activeColor={config.indicatorActive}
        inactiveColor={config.indicatorInactive}
      />

      {/* Bowl area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 pb-4">
        <Bowl
          dice={state.dice}
          isRolling={state.isRolling}
          isHolding={state.isHolding}
          bowlOuter={config.bowlOuter}
          bowlInner={config.bowlInner}
          onPointerDown={startHolding}
          onPointerUp={stopHolding}
          disabled={state.isTurnOver || state.rollCount >= 3}
          tapHint={t.tapToRoll}
        />

        {/* Role display */}
        <RoleDisplay
          result={state.roleResult}
          accentClass={config.accentClass}
          textClass={config.textClass}
          labels={roleLabels}
        />
      </div>

      {/* Next turn overlay – below bowl */}
      <AnimatePresence>
        {state.isTurnOver && (
          <NextTurnOverlay
            onTap={nextTurn}
            nextPlayerText={t.nextPlayer}
            tapToContinueText={t.tapToContinue}
          />
        )}
      </AnimatePresence>

      {/* Settings panel */}
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        theme={theme}
        setTheme={setTheme}
        locale={locale}
        toggleLocale={toggleLocale}
        animationDuration={animationDuration}
        setAnimationDuration={setAnimationDuration}
        labels={{
          settings: t.settings,
          theme: t.theme,
          language: t.language,
          animationDuration: t.animationDuration,
          themes: t.themes,
          seconds: t.seconds,
          closeAriaLabel: t.closeAriaLabel,
        }}
      />

      {/* Rules modal */}
      <RulesModal
        isOpen={rulesOpen}
        onClose={() => setRulesOpen(false)}
        title={t.rulesTitle}
        rules={t.rules}
        closeLabel={t.close}
        closeAriaLabel={t.closeAriaLabel}
      />
    </main>
  );
}
