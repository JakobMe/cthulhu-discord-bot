import { DiceRoll } from './dice-roll.class';
import { CheckProps, CheckResult } from '../interfaces/check.interface';
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
    const goal = NumberUtils.parse(target);
    const mod = NumberUtils.parse(modificator);

    return {
      mod,
      modificator: this.getModificator(mod),
      reason: this.getReason(query),
      allowed: this.isAllowed(goal, mod),
      goal: {
        regular: goal,
        hard: Math.floor(goal / 2),
        extreme: Math.floor(goal / 5),
        fumble: goal < 50 ? 96 : 100,
        critical: 1
      }
    };
  }

  private getResult(): CheckResult {
    const { allowed, mod, goal } = this.props;

    if (!allowed) {
      return {
        success: {
          regular: false,
          critical: false,
          fumble: false,
          hard: false,
          extreme: false
        },
        outcome: null,
        rolls: [0, 0],
        discarded: [],
        sum: 0
      };
    }

    const [one] = this.roll(1);
    const tens = this.roll(1 + Math.abs(mod), 10);
    const [ten, discarded] = this.getTens(tens, mod);
    const sum = one + ten || 100;

    const success = {
      regular: sum <= goal.regular,
      hard: sum <= goal.hard,
      extreme: sum <= goal.extreme,
      critical: sum <= goal.critical,
      fumble: sum >= goal.fumble
    };

    return {
      success,
      outcome: this.getOutcome(success),
      rolls: [one, ten],
      discarded,
      sum
    };
  }

  private roll(n: number, factor: 1 | 10 = 1): number[] {
    return new DiceRoll(`${n}w10`).result.rolls.map(r => (r - 1) * factor);
  }

  private getTens(tens: number[], mod: number): [number, number[]] {
    if (mod > 0) {
      return NumberUtils.min(tens);
    } else if (mod < 0) {
      return NumberUtils.max(tens);
    } else {
      return [tens[0], []];
    }
  }

  private getOutcome(success: CheckResult['success']): string {
    if (success.fumble) {
      return 'Patzer :anger:';
    } else if (success.critical) {
      return 'kritischer Erfolg :boom:';
    } else if (success.extreme) {
      return 'extremer Erfolg :white_check_mark:';
    } else if (success.hard) {
      return 'schwieriger Erfolg :white_check_mark:';
    } else if (success.regular) {
      return 'regulärer Erfolg :white_check_mark:';
    } else {
      return 'Fehlschlag :x:';
    }
  }

  private isAllowed(goal: number, mod: number): boolean {
    return Math.abs(mod) <= Check.MOD_MAX && goal <= Check.GOAL_MAX && goal >= Check.GOAL_MIN;
  }

  private getModificator(mod: number): string {
    const abs = Math.abs(mod);

    if (mod > 0) {
      return `mit ${abs} Bonuswürfel(n)`;
    } else if (mod < 0) {
      return `mit ${abs} Strafwürfel(n)`;
    } else {
      return '';
    }
  }

  private getReason(query: string): string {
    return query ? `Probe für "${query}"` : 'Probe';
  }
}
