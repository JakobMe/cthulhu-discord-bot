import { mockLogForEach } from '../mocks/log.mock';
import { mockMessage } from '../mocks/message.mock';
import { CommandPhobie } from '../../src/commands/command-phobie.class';

describe('CommandPhobie', () => {
  mockLogForEach();

  it('should reply on success', () => {
    const message = mockMessage('!phobie');
    new CommandPhobie(message).execute();
    expect(message.reply).toHaveBeenCalledWith(
      expect.stringMatching('deine zufällig ausgewürfelte Phobie')
    );
  });
});
