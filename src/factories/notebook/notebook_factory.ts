import { JupyterFrontEnd } from '@jupyterlab/application';
import { IDocumentManager } from '@jupyterlab/docmanager';
import { IDefaultFileBrowser } from '@jupyterlab/filebrowser';
import { NotebookPanel } from '@jupyterlab/notebook';

import { ILauncherConfiguration } from '../../schema';
import { IDict, IPanelFactory } from '../../token';

export class NotebookFactory implements IPanelFactory {
  constructor(private options: NotebookFactory.IOptions) {}
  async create(config: ILauncherConfiguration, args: IDict): Promise<void> {
    if (!config.sourceCode) {
      return;
    }
    const { documentManager, fileBrowser } = this.options;

    let found = false;
    let index = 0;
    let newName = config.title;
    const allFiles = new Set([...fileBrowser.model.items()].map(it => it.name));
    while (!found) {
      newName = `${config.title}${index === 0 ? '' : '-' + index}.ipynb`;
      if (!allFiles.has(newName)) {
        found = true;
      } else {
        index += 1;
      }
    }
    const fileBlob = new File([config.sourceCode], newName);
    await fileBrowser.model.upload(fileBlob);
    const configArgs: IDict = config.args ?? {};
    const factory = configArgs['widget-type'] ?? 'default';
    const newPath = `${fileBrowser.model.path}/${newName}`;
    const doc = await documentManager.openOrReveal(newPath, factory);
    if (!doc) {
      console.error(`Failed to create widget with ${factory} factory`);
      return;
    }
    await doc.context.ready;
    doc.context.model.fromString(config.sourceCode);

    await doc.context.save();
    if (doc instanceof NotebookPanel) {
      await doc.sessionContext.ready;
      doc.content.activeCellIndex = 1;
    }
  }
}

export namespace NotebookFactory {
  export interface IOptions {
    app: JupyterFrontEnd;
    documentManager: IDocumentManager;
    fileBrowser: IDefaultFileBrowser;
  }
}
