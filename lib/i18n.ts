export type Locale = 'ja' | 'en';

export interface Translations {
  pinzoro: string;
  shigoro: string;
  arashi: string;
  hifumi: string;
  buta: string;
  meAri: (n: number) => string;
  nextPlayer: string;
  tapToContinue: string;
  tapToRoll: string;
  settings: string;
  theme: string;
  language: string;
  animationDuration: string;
  themes: {
    japanese: string;
    casino: string;
    modern: string;
  };
  seconds: (n: number) => string;
  rulesTitle: string;
  rulesButton: string;
  rulesAriaLabel: string;
  settingsAriaLabel: string;
  closeAriaLabel: string;
  close: string;
  rules: string;
}

export const translations: Record<Locale, Translations> = {
  ja: {
    // Role names
    pinzoro: 'ピンゾロ',
    shigoro: 'シゴロ',
    arashi: 'アラシ',
    hifumi: 'ヒフミ',
    buta: '豚',
    meAri: (n: number) => `${n}`,

    // Overlay
    nextPlayer: '次の人へ',
    tapToContinue: 'タップして続ける',

    // Tap hint
    tapToRoll: 'タップして振る',

    // Settings panel
    settings: '設定',
    theme: 'テーマ',
    language: '言語',
    animationDuration: 'アニメーション時間',
    themes: {
      japanese: '和風',
      casino: 'カジノ',
      modern: 'モダン',
    },
    seconds: (n: number) => `${n}秒`,

    // Rules modal
    rulesTitle: 'チンチロのルール',
    rulesButton: '？',
    rulesAriaLabel: 'ルール',
    settingsAriaLabel: '設定',
    closeAriaLabel: '閉じる',
    close: '×',
    rules: `【チンチロのルール】
・3つのサイコロをお椀の中で振ります
・1ターンに最大3回振れます
・役が出た時点でターン終了

【役一覧（強い順）】
ピンゾロ：1-1-1（最強）
シゴロ：4-5-6
アラシ：ゾロ目（例：3-3-3）
目あり：2つ同じ目＋残り1つが目
ヒフミ：1-2-3（最弱）
豚（ブタ）：役なし`,
  },
  en: {
    // Role names
    pinzoro: 'Pinzoro',
    shigoro: 'Shigoro',
    arashi: 'Arashi',
    hifumi: 'Hifumi',
    buta: 'Buta',
    meAri: (n: number) => `${n}`,

    // Overlay
    nextPlayer: 'Next Player',
    tapToContinue: 'Tap to continue',

    // Tap hint
    tapToRoll: 'Tap to roll',

    // Settings panel
    settings: 'Settings',
    theme: 'Theme',
    language: 'Language',
    animationDuration: 'Animation Duration',
    themes: {
      japanese: 'Japanese',
      casino: 'Casino',
      modern: 'Modern',
    },
    seconds: (n: number) => `${n}s`,

    // Rules modal
    rulesTitle: 'Chinchiro Rules',
    rulesButton: '？',
    rulesAriaLabel: 'Rules',
    settingsAriaLabel: 'Settings',
    closeAriaLabel: 'Close',
    close: '×',
    rules: `【Chinchiro Rules】
・Roll 3 dice inside the bowl
・Up to 3 rolls per turn
・Turn ends when a role is made

【Roles (strongest first)】
Pinzoro: 1-1-1 (strongest)
Shigoro: 4-5-6
Arashi: Triplets (e.g. 3-3-3)
Me-ari: Pair + remaining die is the score
Hifumi: 1-2-3 (weakest)
Buta: No role`,
  },
};
