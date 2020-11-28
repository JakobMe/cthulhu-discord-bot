export interface CheckProps {
  allowed: boolean;
  value: number;
  reason: string;
  goal: {
    regular: number;
    hard: number;
    extreme: number;
    fumble: number;
    critical: number;
  };
  mod: {
    bonus: number;
    malus: number;
    sum: number;
    type: string;
  };
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
