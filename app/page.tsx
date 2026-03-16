'use client';

import { AnimatePresence } from 'framer-motion';
import { useGame } from '@/hooks/useGame';
import { useTheme } from '@/hooks/useTheme';
import Bowl from '@/components/Bowl';
import CountIndicator from '@/components/CountIndicator';
import RoleDisplay from '@/components/RoleDisplay';
import NextTurnOverlay from '@/components/NextTurnOverlay';
import ThemeSwitcher from '@/components/ThemeSwitcher';

export default function Home() {
  const { state, startHolding, stopHolding, nextTurn } = useGame();
  const { theme, config, cycleTheme } = useTheme();

  const isAnimating = state.isRolling || state.isHolding;

  return (
    <main
      className={`relative flex flex-col min-h-screen ${config.bgClass} ${config.textClass} transition-colors duration-500`}
    >
      {/* Header */}
      <div className="relative flex items-center justify-center pt-4 px-4">
        <h1 className={`text-xl font-bold tracking-widest ${config.accentClass}`}>
          チンチロ
        </h1>
        <div className="absolute right-4 top-3">
          <ThemeSwitcher
            theme={theme}
            onCycle={cycleTheme}
            disabled={isAnimating}
          />
        </div>
      </div>

      {/* Count indicator */}
      <CountIndicator
        rollCount={state.rollCount}
        activeColor={config.indicatorActive}
        inactiveColor={config.indicatorInactive}
      />

      {/* Bowl area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 pb-8">
        <Bowl
          dice={state.dice}
          isRolling={state.isRolling}
          isHolding={state.isHolding}
          bowlOuter={config.bowlOuter}
          bowlInner={config.bowlInner}
          onPointerDown={startHolding}
          onPointerUp={stopHolding}
          disabled={state.isTurnOver || state.rollCount >= 3}
        />

        {/* Role display */}
        <RoleDisplay
          result={state.roleResult}
          accentClass={config.accentClass}
          textClass={config.textClass}
        />
      </div>

      {/* Next turn overlay */}
      <AnimatePresence>
        {state.isTurnOver && (
          <NextTurnOverlay
            overlayClass={config.overlayClass}
            onTap={nextTurn}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
