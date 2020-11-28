import { Templates } from '../../src/classes/templates.class';

describe('Templates', () => {
  const templates = new Templates();

  it('should create correct output without data', () => {
    const output = templates.render('wurf/invalid');
    expect(output).toBe('mit solchen Würfeln kann ich nichts anfangen :robot: —');
  });

  it('should create correct output with valid data', () => {
    const output = templates.render('wurf/default', {
      n: 2,
      m: 6,
      modificator: '+2',
      rolls: [3, 5],
      sum: 10
    });
    expect(output).toBe('dein Würfelergebnis mit 2w6 +2 ist `3,5` und in Summe `10` :game_die:');
  });

  it('should create correct output with invalid data', () => {
    const output = templates.render('wurf/default', {});
    expect(output).toBe('dein Würfelergebnis mit w  ist `` und in Summe `` :game_die:');
  });

  it('should concatenate multiple templates', () => {
    const output = templates.render(['wurf/invalid', 'wurf/invalid']);
    expect(output).toBe(
      'mit solchen Würfeln kann ich nichts anfangen :robot: — mit solchen Würfeln kann ich nichts anfangen :robot: —'
    );
  });
});
