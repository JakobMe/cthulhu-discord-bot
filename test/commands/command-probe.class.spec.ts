import { mockLogForEach } from '../mocks/log.mock';
import { mockMessage } from '../mocks/message.mock';
import { CommandProbe } from '../../src/commands/command-probe.class';

describe('CommandProbe', () => {
  mockLogForEach();

  it('should reply on success', () => {
    const message = mockMessage('!probe 70');
    new CommandProbe(message).execute();
    expect(message.reply).toHaveBeenCalledWith(
      expect.stringMatching('Probe auf den Wert 70 ist mit')
    );
  });

  it('should reply on success with options', () => {
    const message = mockMessage('!probe 40 !bonus 2 "Überreden"');
    new CommandProbe(message).execute();
    expect(message.reply).toHaveBeenCalledWith(
      expect.stringMatching('Probe für "Überreden" auf den Wert 40 mit 2 Bonuswürfel')
    );
  });

  it('should reply on invalid dice', () => {
    const message = mockMessage('!probe abc');
    new CommandProbe(message).execute();
    expect(message.reply).toHaveBeenCalledWith(
      expect.stringMatching('der Fertigkeitswert der Probe muss')
    );
  });

  it('should reply on disallowed mod', () => {
    const message = mockMessage('!probe 60 !malus 10');
    new CommandProbe(message).execute();
    expect(message.reply).toHaveBeenCalledWith(
      expect.stringMatching('es dürfen maximal 5 Bonus-/Strafwürfel')
    );
  });
});
