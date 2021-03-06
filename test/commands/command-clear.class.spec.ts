import { mockLogForEach } from '../mocks/log.mock';
import { mockMessage } from '../mocks/message.mock';
import { CommandClear } from '../../src/commands/command-clear.class';

describe('CommandClear', () => {
  mockLogForEach();

  it('should not call bulkDelete when user is no admin', done => {
    const message = mockMessage('!clear', false);
    new CommandClear(message).execute();

    expect(message.channel.bulkDelete).not.toHaveBeenCalled();

    setTimeout(() => {
      expect(message.reply).not.toHaveBeenCalled();
      done();
    });
  });

  it('should call bulkDelete 100 without amount', done => {
    const message = mockMessage('!clear');
    new CommandClear(message).execute();

    expect(message.channel.bulkDelete).toHaveBeenCalledWith(100, true);

    setTimeout(() => {
      expect(message.reply).toHaveBeenCalled();
      done();
    });
  });

  it('should call bulkDelete 100 with amount > 100', done => {
    const message = mockMessage('!clear 200');
    new CommandClear(message).execute();

    expect(message.channel.bulkDelete).toHaveBeenCalledWith(100, true);

    setTimeout(() => {
      expect(message.reply).toHaveBeenCalled();
      done();
    });
  });

  it('should call bulkDelete with specified amount', done => {
    const message = mockMessage('!clear 5');
    new CommandClear(message).execute();

    expect(message.channel.bulkDelete).toHaveBeenCalledWith(6, true);

    setTimeout(() => {
      expect(message.reply).toHaveBeenCalled();
      done();
    });
  });
});
