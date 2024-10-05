import { JupyterFrontEnd } from '@jupyterlab/application';
import { NotebookPanel } from '@jupyterlab/notebook';
import { IDocumentManager } from '@jupyterlab/docmanager';
import { ILauncherConfiguration } from '../../schema';
import { IDict, IPanelFactory } from '../../token';

export class NotebookFactory implements IPanelFactory {
  constructor(private options: NotebookFactory.IOptions) {}
  async create(config: ILauncherConfiguration, args: IDict): Promise<void> {
    if (!config.sourceCode) {
      return;
    }
    const { documentManager } = this.options;
    const cwd = args['cwd'];
    const app = this.options.app;

    const model = await documentManager.newUntitled({
      path: cwd,
      type: 'notebook',
      ext: '.ipynb'
    });
    let renamed = false;
    let index = 0;
    let newName = model.path;
    while (!renamed) {
      try {
        newName = `${config.title}${index === 0 ? '' : '-' + index}.ipynb`;
        await documentManager.rename(model.path, newName);
        renamed = true;
      } catch {
        index += 1;
      }
    }
    const doc: NotebookPanel = await app.commands.execute('docmanager:open', {
      path: newName
    });
    await doc.context.ready;
    doc.context.model.fromString(config.sourceCode);

    await doc.context.save();
    await doc.sessionContext.ready;
    doc.content.activeCellIndex = 1;
  }
}

export namespace NotebookFactory {
  export interface IOptions {
    app: JupyterFrontEnd;
    documentManager: IDocumentManager;
  }
}
