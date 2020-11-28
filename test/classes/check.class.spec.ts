import { mockRandomForEach, mockRandom } from '../mocks/random.mock';
import { Check } from '../../src/classes/check.class';

describe('Check', () => {
  mockRandomForEach(0.5);

  it('should be valid with simple input', () => {
    mockRandom([0.6, 0.5]);
    const { result, props } = new Check('75');

    expect(props).toEqual({
      allowed: true,
      value: 75,
      reason: 'Probe',
      mod: {
        sum: 0,
        bonus: 0,
        malus: 0,
        type: null
      },
      goal: {
        regular: 75,
        hard: 37,
        extreme: 15,
        critical: 1,
        fumble: 100
      }
    });

    expect(result).toEqual({
      outcome: 'regulärer Erfolg',
      emoji: ':white_check_mark:',
      roll: {
        one: 6,
        ten: 50,
        sum: 56,
        discarded: []
      }
    });
  });

  it('should be valid with bonus', () => {
    mockRandom([0.4, 0.4, 0.8, 0.5]);
    const { result, props } = new Check('45', '2', null, 'Springen');

    expect(props).toEqual({
      allowed: true,
      value: 45,
      reason: 'Probe für "Springen"',
      mod: {
        sum: 2,
        bonus: 2,
        malus: 0,
        type: 'Bonuswürfel'
      },
      goal: {
        regular: 45,
        hard: 22,
        extreme: 9,
        critical: 1,
        fumble: 96
      }
    });

    expect(result).toEqual({
      outcome: 'regulärer Erfolg',
      emoji: ':white_check_mark:',
      roll: {
        one: 4,
        ten: 40,
        sum: 44,
        discarded: [80, 50]
      }
    });
  });

  it('should be valid with malus', () => {
    mockRandom([0.9, 0.1, 0.7]);
    const { result, props } = new Check('20', null, '1', 'Überreden');

    expect(props).toEqual({
      allowed: true,
      value: 20,
      reason: 'Probe für "Überreden"',
      mod: {
        sum: -1,
        bonus: 0,
        malus: 1,
        type: 'Strafwürfel'
      },
      goal: {
        regular: 20,
        hard: 10,
        extreme: 4,
        critical: 1,
        fumble: 96
      }
    });

    expect(result).toEqual({
      outcome: 'Fehlschlag',
      emoji: ':x:',
      roll: {
        one: 9,
        ten: 70,
        sum: 79,
        discarded: [10]
      }
    });
  });

  it('should add bonus and malus', () => {
    mockRandom([0.5, 0.5, 0.3, 0.8]);
    const { result, props } = new Check('50', '1', '3');

    expect(props).toEqual({
      allowed: true,
      value: 50,
      reason: 'Probe',
      mod: {
        sum: -2,
        bonus: 1,
        malus: 3,
        type: 'Strafwürfel'
      },
      goal: {
        regular: 50,
        hard: 25,
        extreme: 10,
        critical: 1,
        fumble: 100
      }
    });

    expect(result).toEqual({
      outcome: 'Fehlschlag',
      emoji: ':x:',
      roll: {
        one: 5,
        ten: 80,
        sum: 85,
        discarded: [50, 30]
      }
    });
  });

  it('should be valid on hard success', () => {
    mockRandom([0.5, 0.1]);
    const { result, props } = new Check('50');

    expect(props).toEqual({
      allowed: true,
      value: 50,
      reason: 'Probe',
      mod: {
        sum: 0,
        bonus: 0,
        malus: 0,
        type: null
      },
      goal: {
        regular: 50,
        hard: 25,
        extreme: 10,
        critical: 1,
        fumble: 100
      }
    });

    expect(result).toEqual({
      outcome: 'schwieriger Erfolg',
      emoji: ':white_check_mark:',
      roll: {
        one: 5,
        ten: 10,
        sum: 15,
        discarded: []
      }
    });
  });

  it('should be valid on extreme success', () => {
    mockRandom([0.5, 0]);
    const { result, props } = new Check('50');

    expect(props).toEqual({
      allowed: true,
      value: 50,
      reason: 'Probe',
      mod: {
        sum: 0,
        bonus: 0,
        malus: 0,
        type: null
      },
      goal: {
        regular: 50,
        hard: 25,
        extreme: 10,
        critical: 1,
        fumble: 100
      }
    });

    expect(result).toEqual({
      outcome: 'extremer Erfolg',
      emoji: ':white_check_mark:',
      roll: {
        one: 5,
        ten: 0,
        sum: 5,
        discarded: []
      }
    });
  });

  it('should be valid on critical success', () => {
    mockRandom([0.1, 0]);
    const { result, props } = new Check('50');

    expect(props).toEqual({
      allowed: true,
      value: 50,
      reason: 'Probe',
      mod: {
        sum: 0,
        bonus: 0,
        malus: 0,
        type: null
      },
      goal: {
        regular: 50,
        hard: 25,
        extreme: 10,
        critical: 1,
        fumble: 100
      }
    });

    expect(result).toEqual({
      outcome: '**kritischer Erfolg**',
      emoji: ':boom:',
      roll: {
        one: 1,
        ten: 0,
        sum: 1,
        discarded: []
      }
    });
  });

  it('should be valid on fumble with goal > 50', () => {
    mockRandom([0, 0]);
    const { result, props } = new Check('50');

    expect(props).toEqual({
      allowed: true,
      value: 50,
      reason: 'Probe',
      mod: {
        sum: 0,
        bonus: 0,
        malus: 0,
        type: null
      },
      goal: {
        regular: 50,
        hard: 25,
        extreme: 10,
        critical: 1,
        fumble: 100
      }
    });

    expect(result).toEqual({
      outcome: '**Patzer**',
      emoji: ':anger:',
      roll: {
        one: 0,
        ten: 0,
        sum: 100,
        discarded: []
      }
    });
  });

  it('should be valid on fumble with goal < 50', () => {
    mockRandom([0.7, 0.9]);
    const { result, props } = new Check('30');

    expect(props).toEqual({
      allowed: true,
      value: 30,
      reason: 'Probe',
      mod: {
        sum: 0,
        bonus: 0,
        malus: 0,
        type: null
      },
      goal: {
        regular: 30,
        hard: 15,
        extreme: 6,
        critical: 1,
        fumble: 96
      }
    });

    expect(result).toEqual({
      outcome: '**Patzer**',
      emoji: ':anger:',
      roll: {
        one: 7,
        ten: 90,
        sum: 97,
        discarded: []
      }
    });
  });

  it('should be disallowed with out-of-bounds target', () => {
    const { result, props } = new Check('150');

    expect(props).toEqual({
      allowed: false,
      value: 150,
      reason: 'Probe',
      mod: {
        sum: 0,
        bonus: 0,
        malus: 0,
        type: null
      },
      goal: {
        regular: 150,
        hard: 75,
        extreme: 30,
        critical: 1,
        fumble: 100
      }
    });

    expect(result).toEqual({
      outcome: null,
      emoji: null,
      roll: {
        one: 0,
        ten: 0,
        sum: 0,
        discarded: []
      }
    });
  });

  it('should be disallowed with out-of-bounds mod', () => {
    const { result, props } = new Check('50', '10');

    expect(props).toEqual({
      allowed: false,
      value: 50,
      reason: 'Probe',
      mod: {
        sum: 10,
        bonus: 10,
        malus: 0,
        type: 'Bonuswürfel'
      },
      goal: {
        regular: 50,
        hard: 25,
        extreme: 10,
        critical: 1,
        fumble: 100
      }
    });

    expect(result).toEqual({
      outcome: null,
      emoji: null,
      roll: {
        one: 0,
        ten: 0,
        sum: 0,
        discarded: []
      }
    });
  });
});
