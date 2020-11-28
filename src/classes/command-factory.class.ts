import { Message } from 'discord.js';
import { Command } from './command.class';
import { CommandClear } from '../commands/command-clear.class';
import { CommandHilfe } from '../commands/command-hilfe.class';
import { CommandWurf } from '../commands/command-wurf.class';
import { CommandProbe } from '../commands/command-probe.class';
import { CommandPhobie } from '../commands/command-phobie.class';
import { CommandZwang } from '../commands/command-zwang.class';
import { CommandWahnsinn } from '../commands/command-wahnsinn.class';

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
      case 'probe':
        this.command = new CommandProbe(message);
        break;
      case 'phobie':
        this.command = new CommandPhobie(message);
        break;
      case 'zwang':
        this.command = new CommandZwang(message);
        break;
      case 'wahnsinn':
        this.command = new CommandWahnsinn(message);
        break;
      default:
        this.command = null;
        break;
    }
  }
}
