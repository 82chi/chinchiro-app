'use client';

import { AnimatePresence } from 'framer-motion';
import { useGame } from '@/hooks/useGame';
import { useTheme } from '@/hooks/useTheme';
import { useSettings } from '@/hooks/useSettings';
import Bowl from '@/components/Bowl';
import CountIndicator from '@/components/CountIndicator';
import RoleDisplay from '@/components/RoleDisplay';
import NextTurnOverlay from '@/components/NextTurnOverlay';
import RulesModal from '@/components/RulesModal';
import SettingsPanel from '@/components/SettingsPanel';
import { t } from '@/lib/i18n';

export default function Home() {
  const { settings, setTheme, setLocale, setAnimDuration } = useSettings();
  const { state, startHolding, stopHolding, nextTurn } = useGame(settings.animDuration);
  const { config } = useTheme(settings.theme);
  const tr = t(settings.locale);

  const isAnimating = state.isRolling || state.isHolding;

  return (
    <main
      className={`relative flex flex-col min-h-screen ${config.bgClass} ${config.textClass} transition-colors duration-500`}
    >
      {/* Header */}
      <div className="relative flex items-center justify-between pt-4 px-4">
        <RulesModal
          locale={settings.locale}
          textClass={config.textClass}
          accentClass={config.accentClass}
        />
        <div />
        <SettingsPanel
          theme={settings.theme}
          locale={settings.locale}
          animDuration={settings.animDuration}
          onThemeChange={setTheme}
          onLocaleChange={setLocale}
          onAnimDurationChange={setAnimDuration}
          disabled={isAnimating}
        />
      </div>

      {/* Count indicator */}
      <CountIndicator
        rollCount={state.rollCount}
        activeColor={config.indicatorActive}
        inactiveColor={config.indicatorInactive}
      />

      {/* Bowl area — centered, slightly above midpoint */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 pb-16">
        <Bowl
          dice={state.dice}
          isRolling={state.isRolling}
          isHolding={state.isHolding}
          bowlOuter={config.bowlOuter}
          bowlInner={config.bowlInner}
          onPointerDown={startHolding}
          onPointerUp={stopHolding}
          disabled={state.isTurnOver || state.rollCount >= 3}
          tapHint={tr.ui.tapToRoll}
        />

        {/* Role display */}
        <RoleDisplay
          result={state.roleResult}
          accentClass={config.accentClass}
          textClass={config.textClass}
          roleNames={tr.roles}
        />
      </div>

      {/* Next turn overlay */}
      <AnimatePresence>
        {state.isTurnOver && (
          <NextTurnOverlay
            overlayClass={config.overlayClass}
            onTap={nextTurn}
            nextTurnText={tr.ui.nextTurn}
            tapToContinueText={tr.ui.tapToContinue}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
