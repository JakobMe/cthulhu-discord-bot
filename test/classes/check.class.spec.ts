import { mockRandomForEach, mockRandom } from '../mocks/random.mock';
import { Check } from '../../src/classes/check.class';

describe('Check', () => {
  mockRandomForEach(0.5);

  it('should be valid with simple input', () => {
    mockRandom([0.6, 0.5]);
    const { result, props } = new Check('75');

    expect(props).toEqual({
      goal: {
        regular: 75,
        hard: 37,
        extreme: 15,
        critical: 1,
        fumble: 100
      },
      mod: 0,
      modificator: '',
      reason: 'Probe',
      allowed: true
    });

    expect(result).toEqual({
      success: {
        regular: true,
        hard: false,
        extreme: false,
        critical: false,
        fumble: false
      },
      rolls: [6, 50],
      discarded: [],
      sum: 56,
      outcome: 'regulärer Erfolg :white_check_mark:'
    });
  });

  it('should be valid with bonus', () => {
    mockRandom([0.4, 0.4, 0.8, 0.5]);
    const { result, props } = new Check('45', '+2', 'Springen');

    expect(props).toEqual({
      goal: {
        regular: 45,
        hard: 22,
        extreme: 9,
        critical: 1,
        fumble: 96
      },
      mod: 2,
      modificator: 'mit 2 Bonuswürfel(n)',
      reason: 'Probe für "Springen"',
      allowed: true
    });

    expect(result).toEqual({
      success: {
        regular: true,
        hard: false,
        extreme: false,
        critical: false,
        fumble: false
      },
      rolls: [4, 40],
      discarded: [80, 50],
      sum: 44,
      outcome: 'regulärer Erfolg :white_check_mark:'
    });
  });

  it('should be valid with malus', () => {
    mockRandom([0.9, 0.1, 0.7]);
    const { result, props } = new Check('20', '-1', 'Überreden');

    expect(props).toEqual({
      goal: {
        regular: 20,
        hard: 10,
        extreme: 4,
        critical: 1,
        fumble: 96
      },
      mod: -1,
      modificator: 'mit 1 Strafwürfel(n)',
      reason: 'Probe für "Überreden"',
      allowed: true
    });

    expect(result).toEqual({
      success: {
        regular: false,
        hard: false,
        extreme: false,
        critical: false,
        fumble: false
      },
      rolls: [9, 70],
      discarded: [10],
      sum: 79,
      outcome: 'Fehlschlag :x:'
    });
  });

  it('should be valid on hard success', () => {
    mockRandom([0.5, 0.1]);
    const { result, props } = new Check('50');

    expect(props).toEqual({
      goal: {
        regular: 50,
        hard: 25,
        extreme: 10,
        critical: 1,
        fumble: 100
      },
      mod: 0,
      modificator: '',
      reason: 'Probe',
      allowed: true
    });

    expect(result).toEqual({
      success: {
        regular: true,
        hard: true,
        extreme: false,
        critical: false,
        fumble: false
      },
      rolls: [5, 10],
      discarded: [],
      sum: 15,
      outcome: 'schwieriger Erfolg :white_check_mark:'
    });
  });

  it('should be valid on extreme success', () => {
    mockRandom([0.5, 0]);
    const { result, props } = new Check('50');

    expect(props).toEqual({
      goal: {
        regular: 50,
        hard: 25,
        extreme: 10,
        critical: 1,
        fumble: 100
      },
      mod: 0,
      modificator: '',
      reason: 'Probe',
      allowed: true
    });

    expect(result).toEqual({
      success: {
        regular: true,
        hard: true,
        extreme: true,
        critical: false,
        fumble: false
      },
      rolls: [5, 0],
      discarded: [],
      sum: 5,
      outcome: 'extremer Erfolg :white_check_mark:'
    });
  });

  it('should be valid on critical success', () => {
    mockRandom([0.1, 0]);
    const { result, props } = new Check('50');

    expect(props).toEqual({
      goal: {
        regular: 50,
        hard: 25,
        extreme: 10,
        critical: 1,
        fumble: 100
      },
      mod: 0,
      modificator: '',
      reason: 'Probe',
      allowed: true
    });

    expect(result).toEqual({
      success: {
        regular: true,
        hard: true,
        extreme: true,
        critical: true,
        fumble: false
      },
      rolls: [1, 0],
      discarded: [],
      sum: 1,
      outcome: 'kritischer Erfolg :boom:'
    });
  });

  it('should be valid on fumble with goal > 50', () => {
    mockRandom([0, 0]);
    const { result, props } = new Check('50');

    expect(props).toEqual({
      goal: {
        regular: 50,
        hard: 25,
        extreme: 10,
        critical: 1,
        fumble: 100
      },
      mod: 0,
      modificator: '',
      reason: 'Probe',
      allowed: true
    });

    expect(result).toEqual({
      success: {
        regular: false,
        hard: false,
        extreme: false,
        critical: false,
        fumble: true
      },
      rolls: [0, 0],
      discarded: [],
      sum: 100,
      outcome: 'Patzer :anger:'
    });
  });

  it('should be valid on fumble with goal < 50', () => {
    mockRandom([0.7, 0.9]);
    const { result, props } = new Check('30');

    expect(props).toEqual({
      goal: {
        regular: 30,
        hard: 15,
        extreme: 6,
        critical: 1,
        fumble: 96
      },
      mod: 0,
      modificator: '',
      reason: 'Probe',
      allowed: true
    });

    expect(result).toEqual({
      success: {
        regular: false,
        hard: false,
        extreme: false,
        critical: false,
        fumble: true
      },
      rolls: [7, 90],
      discarded: [],
      sum: 97,
      outcome: 'Patzer :anger:'
    });
  });

  it('should be disallowed with out-of-bounds target', () => {
    const { result, props } = new Check('150');

    expect(props).toEqual({
      goal: {
        regular: 150,
        hard: 75,
        extreme: 30,
        critical: 1,
        fumble: 100
      },
      mod: 0,
      modificator: '',
      reason: 'Probe',
      allowed: false
    });

    expect(result).toEqual({
      success: {
        regular: false,
        hard: false,
        extreme: false,
        critical: false,
        fumble: false
      },
      rolls: [0, 0],
      discarded: [],
      sum: 0,
      outcome: null
    });
  });

  it('should be disallowed with out-of-bounds mod', () => {
    const { result, props } = new Check('50', '10');

    expect(props).toEqual({
      goal: {
        regular: 50,
        hard: 25,
        extreme: 10,
        critical: 1,
        fumble: 100
      },
      mod: 10,
      modificator: 'mit 10 Bonuswürfel(n)',
      reason: 'Probe',
      allowed: false
    });

    expect(result).toEqual({
      success: {
        regular: false,
        hard: false,
        extreme: false,
        critical: false,
        fumble: false
      },
      rolls: [0, 0],
      discarded: [],
      sum: 0,
      outcome: null
    });
  });
});
