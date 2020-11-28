export interface DiceRollProps {
  n: number;
  m: number;
  mod: number;
  valid: boolean;
  allowed: boolean;
  modificator: string;
  expression: string;
}

export interface DiceRollResult {
  rolls: number[];
  sum: number;
}
