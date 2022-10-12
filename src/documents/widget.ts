import { IEditorMimeTypeService } from '@jupyterlab/codeeditor';
import { DocumentRegistry, DocumentWidget } from '@jupyterlab/docregistry';
import {
  INotebookModel,
  INotebookTracker,
  NotebookPanel
} from '@jupyterlab/notebook';
import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { ServiceManager } from '@jupyterlab/services';
import { ISessionContext } from '@jupyterlab/apputils';
import { Signal } from '@lumino/signaling';
import { Widget } from '@lumino/widgets';

import { NotebookGridFactory } from '../factories/notebook_grid/notebook_grid_factory';
import { ILauncherConfiguration } from '../schema';
import { AppWidget } from '../factories/notebook_grid/app_widget';

export interface IGridOptions {
  manager: ServiceManager;
  rendermime: IRenderMimeRegistry;
  tracker: INotebookTracker;
  contentFactory: NotebookPanel.IContentFactory;
  mimeTypeService: IEditorMimeTypeService;
}

export class NotebookGridDocWidget extends DocumentWidget<
  NotebookGridPanel,
  INotebookModel
> {
  constructor(
    private options: DocumentWidget.IOptions<NotebookGridPanel, INotebookModel>
  ) {
    super(options);
  }

  dispose(): void {
    this.content.dispose();
    super.dispose();
  }

  get sessionContext(): ISessionContext {
    return this.options.content.sessionContext;
  }
}

export class NotebookGridPanel extends Widget {
  constructor(
    context: DocumentRegistry.IContext<INotebookModel>,
    notebookGridFactory: NotebookGridFactory
  ) {
    super();
    this.addClass('jp-al-NotebookGridDoc');
    context.ready.then(async () => {
      const sourceCode = context.model.toString();
      const path = context.contentsModel?.path;
      const cwd = path?.substring(0, path.lastIndexOf('/') + 1);
      const config: ILauncherConfiguration = {
        title: context.path,
        id: '',
        sourceCode,
        source: '',
        cwd: cwd,
        type: 'notebook-grid'
      };
      const launcherApp = await notebookGridFactory.create(config);

      if (launcherApp) {
        this._widget = launcherApp.panel;
        Widget.attach(this._widget, this.node);
      }
    });
  }

  dispose(): void {
    if (this.isDisposed) {
      return;
    }
    this._widget.dispose();
    Signal.clearData(this);
    super.dispose();
  }

  get sessionContext(): ISessionContext {
    return this._widget.model.context.sessionContext;
  }

  get model(): INotebookModel | null {
    return this._widget.model.context.model;
  }

  private _widget: AppWidget;
}
