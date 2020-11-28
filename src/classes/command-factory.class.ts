import { Message } from 'discord.js';
import { Command } from './command.class';
import { CommandClear } from '../commands/command-clear.class';
import { CommandHilfe } from '../commands/command-hilfe.class';
import { CommandWurf } from '../commands/command-wurf.class';

export class CommandFactory {
  public readonly command: Command;

  constructor(message: Message) {
    switch (Command.getCommandName(message)) {
      case 'clear':
        this.command = new CommandClear(message);
        break;
      case 'hilfe':
        this.command = new CommandHilfe(message);
        break;
      case 'wurf':
        this.command = new CommandWurf(message);
        break;
      default:
        this.command = null;
        break;
    }
  }
}
