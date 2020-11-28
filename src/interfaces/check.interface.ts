export interface CheckProps {
  goal: {
    regular: number;
    hard: number;
    extreme: number;
    fumble: number;
    critical: number;
  };
  value: number;
  bonus: number;
  malus: number;
  reason: string;
  allowed: boolean;
}

export interface CheckResult {
  roll: {
    one: number;
    ten: number;
    sum: number;
    discarded: number[];
  };
  outcome: string;
  emoji: string;
}

export interface CheckSuccess {
  regular: boolean;
  hard: boolean;
  extreme: boolean;
  critical: boolean;
  fumble: boolean;
}
