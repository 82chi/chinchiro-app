import { LocaleType } from '@/types';

export const translations = {
  ja: {
    roles: {
      pinzoro: 'ピンゾロ',
      shigoro: 'シゴロ',
      arashi: 'アラシ',
      hifumi: 'ヒフミ',
      buta: '豚',
    },
    ui: {
      tapToRoll: 'タップして振る',
      nextTurn: '次の人へ',
      tapToContinue: 'タップして続ける',
      rules: 'ルール',
      settings: '設定',
      theme: 'テーマ',
      language: '言語',
      animDuration: 'アニメーション秒数',
      japanese: '和風',
      casino: 'カジノ',
      modern: 'モダン',
      oneSecond: '1秒',
      twoSeconds: '2秒',
      threeSeconds: '3秒',
      fiveSeconds: '5秒',
    },
    rules: {
      title: 'チンチロのルール',
      desc: 'サイコロ3つを振り、出た役で勝負！最大3回まで振れます。',
      roles: [
        { name: 'ピンゾロ', dice: '1-1-1', desc: '約1/216の確率' },
        { name: 'シゴロ', dice: '4-5-6', desc: '' },
        { name: '6アラシ〜2アラシ', dice: 'N-N-N', desc: '3つ揃い。大きいほど強い' },
        { name: '目あり', dice: 'N-N-X', desc: '2つ揃い＋出目X (2〜6)' },
        { name: '豚', dice: '役なし', desc: '振り直し可（最大3回）' },
        { name: 'ヒフミ', dice: '1-2-3', desc: '最弱役' },
      ],
    },
  },
  en: {
    roles: {
      pinzoro: 'Pinzoro',
      shigoro: 'Shigoro',
      arashi: 'Storm',
      hifumi: 'Hifumi',
      buta: 'Pig',
    },
    ui: {
      tapToRoll: 'Tap to roll',
      nextTurn: 'Next Turn',
      tapToContinue: 'Tap to continue',
      rules: 'Rules',
      settings: 'Settings',
      theme: 'Theme',
      language: 'Language',
      animDuration: 'Animation Duration',
      japanese: 'Japanese',
      casino: 'Casino',
      modern: 'Modern',
      oneSecond: '1s',
      twoSeconds: '2s',
      threeSeconds: '3s',
      fiveSeconds: '5s',
    },
    rules: {
      title: 'Chinchiro Rules',
      desc: 'Roll 3 dice to get a hand. Up to 3 rolls per turn.',
      roles: [
        { name: 'Pinzoro', dice: '1-1-1', desc: '~1/216 chance' },
        { name: 'Shigoro', dice: '4-5-6', desc: '' },
        { name: '6 Storm – 2 Storm', dice: 'N-N-N', desc: 'Three of a kind. Higher is better' },
        { name: 'Me-ari', dice: 'N-N-X', desc: 'Pair + score X (2–6)' },
        { name: 'Pig', dice: 'No hand', desc: 'Re-roll allowed (max 3 times)' },
        { name: 'Hifumi', dice: '1-2-3', desc: 'Worst hand' },
      ],
    },
  },
} as const;

export type Translations = typeof translations;

export function t(locale: LocaleType) {
  return translations[locale];
}