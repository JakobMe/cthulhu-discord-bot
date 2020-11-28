export interface CheckProps {
  goal: {
    regular: number;
    hard: number;
    extreme: number;
    fumble: number;
    critical: number;
  };
  mod: number;
  modificator: string;
  reason: string;
  allowed: boolean;
}

export interface CheckResult {
  success: {
    regular: boolean;
    hard: boolean;
    extreme: boolean;
    fumble: boolean;
    critical: boolean;
  };
  outcome: string;
  rolls: [number, number];
  discarded: number[];
  sum: number;
}
