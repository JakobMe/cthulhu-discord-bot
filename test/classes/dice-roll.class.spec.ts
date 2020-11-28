import { mockRandomForEach } from '../mocks/random.mock';
import { DiceRoll } from '../../src/classes/dice-roll.class';

describe('DiceRoll', () => {
  mockRandomForEach(0.5);

  it('should be valid with correct input', () => {
    const { result, props } = new DiceRoll('3w6');

    expect(result).toEqual({
      rolls: [4, 4, 4],
      sum: 12
    });

    expect(props).toEqual({
      n: 3,
      m: 6,
      mod: 0,
      valid: true,
      allowed: true,
      modificator: '±0',
      expression: '3w6'
    });
  });

  it('should be valid with correct input and alternative syntax', () => {
    const { result, props } = new DiceRoll('3');

    expect(result).toEqual({
      rolls: [2],
      sum: 2
    });

    expect(props).toEqual({
      n: 1,
      m: 3,
      mod: 0,
      valid: true,
      allowed: true,
      modificator: '±0',
      expression: '1w3'
    });
  });

  it('should be valid with correct input and mod', () => {
    const { result, props } = new DiceRoll('2w12', '10');

    expect(result).toEqual({
      rolls: [7, 7],
      sum: 24
    });

    expect(props).toEqual({
      n: 2,
      m: 12,
      mod: 10,
      valid: true,
      allowed: true,
      modificator: '+10',
      expression: '2w12'
    });
  });

  it('should be valid with negative sum capped at 0', () => {
    const { result, props } = new DiceRoll('2w2', '-10');

    expect(result).toEqual({
      rolls: [2, 2],
      sum: 0
    });

    expect(props).toEqual({
      n: 2,
      m: 2,
      mod: -10,
      valid: true,
      allowed: true,
      modificator: '-10',
      expression: '2w2'
    });
  });

  it('should be invalid with empty input', () => {
    const { result, props } = new DiceRoll(null, '2');

    expect(result).toEqual({
      rolls: [],
      sum: 0
    });

    expect(props).toEqual({
      n: 1,
      m: 0,
      mod: 2,
      valid: false,
      allowed: true,
      modificator: '+2',
      expression: ''
    });
  });

  it('should be invalid with malformed input', () => {
    const { result, props } = new DiceRoll('2wM', 'd');

    expect(result).toEqual({
      rolls: [],
      sum: 0
    });

    expect(props).toEqual({
      n: 1,
      m: 0,
      mod: 0,
      valid: false,
      allowed: true,
      modificator: '±0',
      expression: ''
    });
  });

  it('should be invalid with excluded m', () => {
    const { result, props } = new DiceRoll('3w5');

    expect(result).toEqual({
      rolls: [],
      sum: 0
    });

    expect(props).toEqual({
      n: 1,
      m: 0,
      mod: 0,
      valid: false,
      allowed: true,
      modificator: '±0',
      expression: ''
    });
  });

  it('should be disallowed with out-of-bounds n', () => {
    const { result, props } = new DiceRoll('100w4');

    expect(result).toEqual({
      rolls: [],
      sum: 0
    });

    expect(props).toEqual({
      n: 100,
      m: 4,
      mod: 0,
      valid: true,
      allowed: false,
      modificator: '±0',
      expression: '100w4'
    });
  });

  it('should be disallowed with out-of-bounds mod', () => {
    const { result, props } = new DiceRoll('6w8', '-200');

    expect(result).toEqual({
      rolls: [],
      sum: 0
    });

    expect(props).toEqual({
      n: 6,
      m: 8,
      mod: -200,
      valid: true,
      allowed: false,
      modificator: '-200',
      expression: '6w8'
    });
  });
});
