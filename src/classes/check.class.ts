import { DiceRoll } from './dice-roll.class';
import { CheckProps, CheckResult, CheckSuccess } from '../interfaces/check.interface';
import NumberUtils from '../utils/number.utils';

export class Check {
  public static readonly GOAL_MIN = 1;
  public static readonly GOAL_MAX = 100;
  public static readonly MOD_MAX = 5;

  public readonly props: CheckProps;
  public readonly result: CheckResult;

  constructor(target: string, mod?: string, query?: string) {
    this.props = this.getProps(target, mod, query);
    this.result = this.getResult();
  }

  private getProps(target: string, modificator: string, query: string): CheckProps {
    const value = NumberUtils.parse(target);
    const mod = NumberUtils.parse(modificator);
    const [bonus, malus] = this.getModificator(mod);

    return {
      value,
      bonus,
      malus,
      reason: this.getReason(query),
      allowed: this.isAllowed(value, mod),
      goal: {
        regular: value,
        hard: Math.floor(value / 2),
        extreme: Math.floor(value / 5),
        fumble: value < 50 ? 96 : 100,
        critical: 1
      }
    };
  }

  private getResult(): CheckResult {
    const { allowed, bonus, malus, goal } = this.props;

    if (!allowed) {
      return {
        roll: {
          one: 0,
          ten: 0,
          sum: 0,
          discarded: []
        },
        outcome: null,
        emoji: null
      };
    }

    const add = bonus || malus;
    const [one] = this.roll(1);
    const tens = this.roll(1 + Math.abs(add), 10);
    const [ten, discarded] = this.getTens(tens, bonus, malus);
    const sum = one + ten || 100;

    const success: CheckSuccess = {
      regular: sum <= goal.regular,
      hard: sum <= goal.hard,
      extreme: sum <= goal.extreme,
      critical: sum <= goal.critical,
      fumble: sum >= goal.fumble
    };

    const [outcome, emoji] = this.getOutcome(success);
    const roll = { one, ten, sum, discarded };

    return { outcome, emoji, roll };
  }

  private roll(n: number, factor: 1 | 10 = 1): number[] {
    return new DiceRoll(`${n}w10`).result.rolls.map(r => (r - 1) * factor);
  }

  private getTens(tens: number[], bonus: number, malus: number): [number, number[]] {
    if (bonus) {
      return NumberUtils.min(tens);
    } else if (malus) {
      return NumberUtils.max(tens);
    } else {
      return [tens[0], []];
    }
  }

  private getOutcome(success: CheckSuccess): [string, string] {
    if (success.fumble) {
      return ['Patzer', ':anger:'];
    } else if (success.critical) {
      return ['kritischer Erfolg', ':boom:'];
    } else if (success.extreme) {
      return ['extremer Erfolg', ':white_check_mark:'];
    } else if (success.hard) {
      return ['schwieriger Erfolg', ':white_check_mark:'];
    } else if (success.regular) {
      return ['regulärer Erfolg', ':white_check_mark:'];
    } else {
      return ['Fehlschlag', ':x:'];
    }
  }

  private isAllowed(goal: number, mod: number): boolean {
    return Math.abs(mod) <= Check.MOD_MAX && goal <= Check.GOAL_MAX && goal >= Check.GOAL_MIN;
  }

  private getModificator(mod: number): [number, number] {
    const abs = Math.abs(mod);
    const bonus = mod > 0 ? abs : 0;
    const malus = mod < 0 ? abs : 0;
    return [bonus, malus];
  }

  private getReason(query: string): string {
    return query ? `Probe für "${query}"` : 'Probe';
  }
}
