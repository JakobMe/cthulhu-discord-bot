import { Check } from '../classes/check.class';
import { Command } from '../classes/command.class';

export class CommandProbe extends Command {
  public execute(): void {
    const [target] = this.args;
    const [bonus, malus] = this.getOptions(['bonus', 'malus']);

    const { result, props } = new Check(target, bonus, malus, this.query);
    const { allowed, reason, value } = props;
    const { outcome, emoji, roll } = result;
    const { one, ten, sum, discarded } = roll;
    const { type } = props.mod;
    const mod = Math.abs(props.mod.sum);

    if (!allowed) {
      this.reply('probe/disallowed');
      return;
    }

    this.reply(mod ? 'probe/mod' : 'probe/default', {
      reason,
      value,
      outcome,
      emoji,
      one,
      ten,
      sum,
      discarded,
      mod,
      type
    });
  }
}
