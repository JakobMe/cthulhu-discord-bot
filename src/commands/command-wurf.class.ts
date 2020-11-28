import { Command } from '../classes/command.class';
import { DiceRoll } from '../classes/dice-roll.class';

export class CommandWurf extends Command {
  public execute(): void {
    const [type, mod] = this.args;
    const { result, props } = new DiceRoll(type, mod);
    const { n, m, modificator, valid, allowed } = props;
    const { rolls, sum } = result;

    if (!valid) {
      this.help('wurf/invalid');
      return;
    }

    if (!allowed) {
      this.reply('wurf/disallowed');
      return;
    }

    this.reply('wurf/default', { n, m, modificator, rolls, sum });
  }
}
