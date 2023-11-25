import { ICommandSchema, ILauncherConfiguration } from '../../schema';
import { IDict, IPanelFactory } from '../../token';
import { ILauncherApp } from '../../token';
import { CommandRegistry } from '@lumino/commands';
import { showErrorMessage } from '@jupyterlab/apputils';
export class CommandsFactory implements IPanelFactory {
  constructor(options: { commands: CommandRegistry }) {
    this._commands = options.commands;
  }
  async create(
    config: ILauncherConfiguration,
    args: IDict
  ): Promise<ILauncherApp | void> {
    const source = config.source as any as ICommandSchema[];
    for (const cmd of source) {
      try {
        await this._commands.execute(cmd.id, cmd.args);
      } catch (error) {
        await showErrorMessage(`${cmd.label}: Error`, error as string);
        break;
      }
    }
    return;
  }

  private _commands: CommandRegistry;
}
