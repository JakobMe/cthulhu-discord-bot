import { Command } from '../classes/command.class';
import { phobias } from '../data/phobias.data';
import ArrayUtils from '../utils/array.utils';

export class CommandPhobie extends Command {
  public execute(): void {
    const [item] = ArrayUtils.randomItem(phobias);
    this.reply('phobie/default', { ...item });
  }
}
