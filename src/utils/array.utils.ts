import NumberUtils from './number.utils';

function randomItem<T>(arr: T[]): [T, T[]] {
  const i = NumberUtils.random(0, arr.length - 1);
  const item = arr[i];
  const rest = arr.filter((_, j) => j !== i);
  return [item, rest];
}

const ArrayUtils = { randomItem };

export default ArrayUtils;
