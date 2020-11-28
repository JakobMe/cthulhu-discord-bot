function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function restrictNumber(num: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, num));
}

function signNumber(num: number): string {
  const sign = num > 0 ? '+' : num === 0 ? '±' : '';
  return `${sign}${num}`;
}

function sumNumbers(numbers: number[], add = 0): number {
  return numbers.reduce((sum, num) => sum + num, add);
}

function parseNumber(str: string | number, fallback = 0): number {
  const val = typeof str === 'number' ? str.toString() : str;
  const int = parseInt(val);
  return isNaN(int) ? fallback : int;
}

function rollNumbers(n: number, m: number): number[] {
  const results = [];
  for (let i = 0; i < n; i++) {
    results.push(randomNumber(1, m));
  }
  return results;
}

function getMin(numbers: number[]): [number, number[]] {
  const min = Math.min(...numbers);
  const i = numbers.findIndex(num => num === min);
  const rest = numbers.filter((_, j) => j !== i);
  return [min, rest];
}

function getMax(numbers: number[]): [number, number[]] {
  const max = Math.max(...numbers);
  const i = numbers.findIndex(num => num === max);
  const rest = numbers.filter((_, j) => j !== i);
  return [max, rest];
}

const NumberUtils = {
  random: randomNumber,
  restrict: restrictNumber,
  sign: signNumber,
  sum: sumNumbers,
  parse: parseNumber,
  roll: rollNumbers,
  min: getMin,
  max: getMax
};

export default NumberUtils;
