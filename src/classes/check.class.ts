import { DiceRoll } from './dice-roll.class';
import { CheckProps, CheckResult, CheckSuccess } from '../interfaces/check.interface';
import NumberUtils from '../utils/number.utils';

export class Check {
  public static readonly GOAL_MIN = 1;
  public static readonly GOAL_MAX = 100;
  public static readonly MOD_MAX = 5;

  public readonly props: CheckProps;
  public readonly result: CheckResult;

  constructor(target: string, bonus?: string, malus?: string, query?: string) {
    this.props = this.getProps(target, [bonus, malus], query);
    this.result = this.getResult();
  }

  private getProps(target: string, modificator: [string, string], query: string): CheckProps {
    const value = NumberUtils.parse(target);
    const mod = this.getModificator(modificator);

    return {
      value,
      mod,
      reason: this.getReason(query),
      allowed: this.isAllowed(value, mod.bonus, mod.malus),
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
    const { allowed, mod, goal } = this.props;

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

    const [one] = this.roll(1);
    const tens = this.roll(1 + Math.abs(mod.sum), 10);
    const [ten, discarded] = this.getTens(tens, one, mod.sum);
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

  private getTens(tens: number[], one: number, mod: number): [number, number[]] {
    const values = tens.map(ten => ten + one || 100);
    const fn = mod > 0 ? NumberUtils.min : NumberUtils.max;
    const [value, discarded] = fn(values);
    return [value - one, discarded.map(d => d - one)];
  }

  private getOutcome(success: CheckSuccess): [string, string] {
    if (success.fumble) {
      return ['**Patzer**', ':anger:'];
    } else if (success.critical) {
      return ['**kritischer Erfolg**', ':boom:'];
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

  private isAllowed(goal: number, bonus: number, malus: number): boolean {
    return (
      bonus <= Check.MOD_MAX &&
      malus <= Check.MOD_MAX &&
      goal <= Check.GOAL_MAX &&
      goal >= Check.GOAL_MIN
    );
  }

  private getModificator(mod: [string, string]): CheckProps['mod'] {
    const bonus = Math.abs(NumberUtils.parse(mod[0]));
    const malus = Math.abs(NumberUtils.parse(mod[1]));
    const sum = bonus - malus;
    const type = sum > 0 ? 'Bonuswürfel' : sum < 0 ? 'Strafwürfel' : null;
    return { bonus, malus, sum, type };
  }

  private getReason(query: string): string {
    return query ? `Probe für "${query}"` : 'Probe';
  }
}
