import { Command } from '../classes/command.class';
import { Templates } from '../classes/templates.class';
import { insanities } from '../data/insanities.data';
import { DataEntry } from '../interfaces/data-entry.interface';
import ArrayUtils from '../utils/array.utils';
import NumberUtils from '../utils/number.utils';

export class CommandWahnsinn extends Command {
  public execute(): void {
    const [type] = this.args;
    const list: DataEntry[] = insanities[type];

    if (!list) {
      this.help('wahnsinn/invalid');
      return;
    }

    const [item] = ArrayUtils.randomItem(list);
    const duration = NumberUtils.random(1, 10);
    const description = Templates.replaceTokens(item.description, { duration });

    this.reply('wahnsinn/default', { ...item, description });
  }
}
