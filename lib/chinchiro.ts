import { DiceValue, RoleResult } from '@/types';

export function evaluateRole(dice: [DiceValue, DiceValue, DiceValue]): RoleResult {
  const sorted = [...dice].sort((a, b) => a - b) as [DiceValue, DiceValue, DiceValue];
  const [a, b, c] = sorted;

  // ピンゾロ: 1-1-1
  if (a === 1 && b === 1 && c === 1) {
    return { type: 'pinzoro', label: 'ピンゾロ' };
  }

  // シゴロ: 4-5-6
  if (a === 4 && b === 5 && c === 6) {
    return { type: 'shigoro', label: 'シゴロ' };
  }

  // ヒフミ: 1-2-3
  if (a === 1 && b === 2 && c === 3) {
    return { type: 'hifumi', label: 'ヒフミ' };
  }

  // アラシ: ゾロ目 (2-2-2 ~ 6-6-6)
  if (a === b && b === c) {
    return { type: 'arashi', label: `${a}アラシ`, arashiValue: a };
  }

  // 目あり: 2つ同じ目 + 残り1つ（1〜6すべてOK）
  if (a === b) {
    return { type: 'me-ari', label: `${c}`, meValue: c };
  }
  if (b === c) {
    return { type: 'me-ari', label: `${a}`, meValue: a };
  }

  // 豚 (ブタ): 役なし
  return { type: 'buta', label: '豚' };
}

export function rollDice(): DiceValue {
  return (Math.floor(Math.random() * 6) + 1) as DiceValue;
}

export function rollAllDice(): [DiceValue, DiceValue, DiceValue] {
  return [rollDice(), rollDice(), rollDice()];
}

export function hasRole(result: RoleResult): boolean {
  return result.type !== 'buta';
}

export function isTurnEndingRole(result: RoleResult): boolean {
  return result.type !== 'buta';
}
