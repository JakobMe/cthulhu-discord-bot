import { mockLogForEach } from '../mocks/log.mock';
import { mockMessage } from '../mocks/message.mock';
import { CommandZwang } from '../../src/commands/command-zwang.class';

describe('CommandZwang', () => {
  mockLogForEach();

  it('should reply on success', () => {
    const message = mockMessage('!zwang');
    new CommandZwang(message).execute();
    expect(message.reply).toHaveBeenCalledWith(
      expect.stringMatching('deine zufällig ausgewürfelte Zwangsstörung')
    );
  });
});
