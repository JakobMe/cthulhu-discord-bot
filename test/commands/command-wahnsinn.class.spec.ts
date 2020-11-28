import { mockLogForEach } from '../mocks/log.mock';
import { mockMessage } from '../mocks/message.mock';
import { CommandWahnsinn } from '../../src/commands/command-wahnsinn.class';

describe('CommandWahnsinn', () => {
  mockLogForEach();

  it('should reply on success', () => {
    const message = mockMessage('!wahnsinn kurz');
    new CommandWahnsinn(message).execute();
    expect(message.reply).toHaveBeenCalledWith(
      expect.stringMatching('dein zufällig ausgewürfelter Anfall von Wahnsinn')
    );
  });

  it('should reply on invalid argument', () => {
    const message = mockMessage('!wahnsinn abc');
    new CommandWahnsinn(message).execute();
    expect(message.reply).toHaveBeenCalledWith(
      expect.stringMatching('es muss entweder "kurz" oder "lang" angegeben')
    );
  });
});
