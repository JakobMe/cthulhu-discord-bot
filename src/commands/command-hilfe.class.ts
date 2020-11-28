import { Command } from '../classes/command.class';

export class CommandHilfe extends Command {
  private static readonly ALLOWED = ['clear', 'wurf', 'probe'];

  public execute(): void {
    const [cmd] = this.args;
    const command = (cmd || '').toLowerCase();
    const name = CommandHilfe.ALLOWED.includes(command) ? command : 'default';
    this.reply(`hilfe/${name}`);
  }
}
