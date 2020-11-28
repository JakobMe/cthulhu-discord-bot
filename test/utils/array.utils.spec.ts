import { resetMockRandom, mockRandom } from '../mocks/random.mock';
import ArrayUtils from '../../src/utils/array.utils';

describe('ArrayUtils', () => {
  test('randomItem should return correct item', () => {
    mockRandom(0.5);
    expect(ArrayUtils.randomItem([1, 2, 3])).toEqual([2, [1, 3]]);
    expect(ArrayUtils.randomItem(['a', 'b', 'c', 'd'])).toEqual(['c', ['a', 'b', 'd']]);
    expect(ArrayUtils.randomItem([])).toEqual([undefined, []]);
    resetMockRandom();
  });
});
