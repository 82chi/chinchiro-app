export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

export type RoleType =
  | 'pinzoro'
  | 'shigoro'
  | 'arashi'
  | 'me-ari'
  | 'hifumi'
  | 'buta';

export interface RoleResult {
  type: RoleType;
  label: string;
  meValue?: number; // For 'me-ari': the eye value (2-6)
  arashiValue?: number; // For 'arashi': the triple value (2-6)
}

export type ThemeType = 'japanese' | 'casino' | 'modern';

export type LocaleType = 'ja' | 'en';

export type AnimDuration = 1 | 2 | 3 | 5;

export interface ThemeConfig {
  name: string;
  bgClass: string;
  bowlOuter: string;
  bowlInner: string;
  textClass: string;
  accentClass: string;
  overlayClass: string;
  indicatorActive: string;
  indicatorInactive: string;
}

export interface GameState {
  dice: [DiceValue, DiceValue, DiceValue];
  rollCount: number;
  isRolling: boolean;
  isHolding: boolean;
  roleResult: RoleResult | null;
  isTurnOver: boolean;
}
