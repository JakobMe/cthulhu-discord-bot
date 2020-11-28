import { Command } from '../classes/command.class';
import { compulsions } from '../data/compulsions.data';
import ArrayUtils from '../utils/array.utils';

export class CommandZwang extends Command {
  public execute(): void {
    const [item] = ArrayUtils.randomItem(compulsions);
    this.reply('zwang/default', { ...item });
  }
}
