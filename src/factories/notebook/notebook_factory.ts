import { JupyterFrontEnd } from '@jupyterlab/application';
import { NotebookPanel } from '@jupyterlab/notebook';
import { Contents } from '@jupyterlab/services';

import { ILauncherConfiguration } from '../../schema';
import { IDict, IPanelFactory } from '../../token';

export class NotebookFactory implements IPanelFactory {
  constructor(private options: NotebookFactory.IOptions) {}
  async create(config: ILauncherConfiguration, args: IDict): Promise<void> {
    if (!config.sourceCode) {
      return;
    }
    const app = this.options.app;
    if (args['copy'] === false) {
      const doc: NotebookPanel = await app.commands.execute('docmanager:open', {
        path: args['path'],
        factory: 'Notebook',
      });
      await doc.context.ready;
      await doc.sessionContext.ready;
      doc.content.activeCellIndex = 1;
    } else {
      const cwd = args['cwd'];
      const model: Contents.IModel = await app.commands.execute(
        'docmanager:new-untitled',
        {
          path: cwd,
          type: 'notebook',
          ext: '.ipynb'
        }
      );
      const doc: NotebookPanel = await app.commands.execute('docmanager:open', {
        path: model.path
      });
      await doc.context.ready;
      doc.context.model.fromString(config.sourceCode);
      doc.context.model.initialize();
      let renamed = false;
      let index = 0;
      while (!renamed) {
        try {
          await doc.context.rename(
            `${config.title}${index === 0 ? '' : '-' + index}.ipynb`
          );
          renamed = true;
        } catch {
          index += 1;
        }
      }
      await doc.context.save();
      await doc.sessionContext.ready;
      doc.content.activeCellIndex = 1;
    }
  }
}

export namespace NotebookFactory {
  export interface IOptions {
    app: JupyterFrontEnd;
  }
}
