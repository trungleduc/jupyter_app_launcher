import { JupyterFrontEnd } from '@jupyterlab/application';
import { IThemeManager } from '@jupyterlab/apputils';
import { TerminalAPI } from '@jupyterlab/services';
import { Terminal } from '@jupyterlab/terminal';

import { ILauncherConfiguration } from '../../schema';
import { IDict, ILauncherApp, IPanelFactory } from '../../token';

export class TerminalFactory implements IPanelFactory<Terminal> {
  constructor(private options: TerminalFactory.IOptions) {}
  async create(
    config: ILauncherConfiguration,
    args: IDict
  ): Promise<ILauncherApp<Terminal>> {
    const cmd = config.source as string;
    const name = config.title;
    const reuse = (config.args as IDict)?.reuse;
    const cwd = config.cwd;
    const { themeManager, app } = this.options;
    const manager = app.serviceManager.terminals;
    const models = await TerminalAPI.listRunning();
    let session;
    const modelNames = models.map(d => d.name);
    if (reuse === true) {
      if (modelNames.includes(name)) {
        session = manager.connectTo({ model: { name } });
      } else {
        session = await manager.startNew({ name, cwd });
      }
    } else {
      let idx = 1;
      let newName = '';
      while (true) {
        newName = `${name}${idx}`;
        if (modelNames.includes(newName)) {
          idx += 1;
        } else {
          break;
        }
      }
      session = await manager.startNew({ name: newName, cwd });
    }

    const terminal = new Terminal(session, {
      initialCommand: cmd,
      theme: 'inherit'
    });
    terminal.title.closable = true;
    const themeCb = () => {
      terminal.setOption('theme', 'inherit');
    };
    themeManager?.themeChanged.connect(themeCb);
    terminal.disposed.connect(() => {
      themeManager?.themeChanged.disconnect(themeCb);
    });
    return { panel: terminal };
  }
}

export namespace TerminalFactory {
  export interface IOptions {
    app: JupyterFrontEnd;
    themeManager?: IThemeManager;
  }
}
