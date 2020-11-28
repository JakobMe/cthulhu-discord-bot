import { DiceRollProps, DiceRollResult } from '../interfaces/dice-roll.interface';
import NumberUtils from '../utils/number.utils';

export class DiceRoll {
  public static readonly N_MAX = 20;
  public static readonly MOD_MAX = 100;

  public static getProps(dice: string, modificator?: string): DiceRollProps {
    const value = dice ?? '';
    const [original, diceN, diceM] = value.match(/^(\d+)?w?(2|3|4|6|8|10|12|20|100)$/i) ?? [];
    const mod = NumberUtils.parse(modificator);
    const n = NumberUtils.parse(diceN, 1);
    const m = NumberUtils.parse(diceM, 0);

    return {
      n,
      m,
      mod,
      valid: DiceRoll.isValid(n, m),
      allowed: DiceRoll.isAllowed(n, mod),
      modificator: NumberUtils.sign(mod),
      expression: original ? `${n}w${m}` : ''
    };
  }

  public readonly props: DiceRollProps;
  public readonly result: DiceRollResult;

  constructor(dice: string, modificator?: string) {
    this.props = DiceRoll.getProps(dice, modificator);
    this.result = this.getResult();
  }

  private getResult(): DiceRollResult {
    const { valid, allowed, n, m, mod } = this.props;

    if (!valid || !allowed) {
      return { rolls: [], sum: 0 };
    }

    const rolls = NumberUtils.roll(n, m);
    const sum = NumberUtils.restrict(NumberUtils.sum(rolls, mod), 0, Infinity);
    return { rolls, sum };
  }

  private static isValid(n: number, m: number): boolean {
    return n > 0 && m > 0;
  }

  private static isAllowed(n: number, mod: number): boolean {
    return n <= DiceRoll.N_MAX && Math.abs(mod) <= DiceRoll.MOD_MAX;
  }
}
