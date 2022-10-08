import { IEditorMimeTypeService } from '@jupyterlab/codeeditor';
import * as nbformat from '@jupyterlab/nbformat';
import {
  INotebookTracker,
  NotebookPanel,
  StaticNotebook
} from '@jupyterlab/notebook';
import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { ServiceManager } from '@jupyterlab/services';
import { UUID } from '@lumino/coreutils';

import { ILauncherConfiguration } from '../../schema';
import { IPanelFactory } from '../../token';
import { ILauncherApp } from './../../token';
import { AppModel } from './app_model';
import { AppWidget } from './app_widget';

export class NotebookGridFactory implements IPanelFactory {
  constructor(private options: NotebookGridFactory.IOptions) {}
  async create(config: ILauncherConfiguration): Promise<ILauncherApp | void> {
    if (!config.sourceCode) {
      console.error('Notebook source is missing');
      return;
    }
    const notebook = JSON.parse(config.sourceCode) as nbformat.INotebookContent;
    if (config.cwd) {
      const cwdCell = {
        cell_type: 'code',
        execution_count: null,
        id: UUID.uuid4(),
        metadata: {
          extensions: {
            jupyter_dashboards: {
              activeView: 'grid_default',
              views: {
                grid_default: {
                  col: null,
                  height: 2,
                  hidden: true,
                  locked: true,
                  row: null,
                  width: 2
                }
              }
            }
          }
        },
        outputs: [],
        source: [
          'import os\n',
          'try:\n',
          `  os.chdir('${config.cwd}')\n`,
          'except:\n',
          '  pass'
        ]
      };
      notebook.cells = [cwdCell, ...notebook.cells];
    }

    const model = new AppModel({
      notebook,
      manager: this.options.manager,
      rendermime: this.options.rendermime,
      tracker: this.options.tracker,
      contentFactory: this.options.contentFactory,
      mimeTypeService: this.options.mimeTypeService,
      editorConfig: StaticNotebook.defaultEditorConfig,
      notebookConfig: StaticNotebook.defaultNotebookConfig
    });
    await model.initialize();
    const panel = new AppWidget({
      id: UUID.uuid4(),
      label: config.title,
      model
    });
    return { panel };
  }
}

export namespace NotebookGridFactory {
  export interface IOptions {
    manager: ServiceManager;
    rendermime: IRenderMimeRegistry;
    tracker: INotebookTracker;
    contentFactory: NotebookPanel.IContentFactory;
    mimeTypeService: IEditorMimeTypeService;
  }
}
