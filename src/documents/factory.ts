import { ABCWidgetFactory, DocumentRegistry } from '@jupyterlab/docregistry';

import { NotebookGridDocWidget, NotebookGridPanel } from './widget';

import { INotebookModel } from '@jupyterlab/notebook';
import { NotebookGridFactory } from '../factories/notebook_grid/notebook_grid_factory';

interface IOptions extends DocumentRegistry.IWidgetFactoryOptions {
  notebookGridFactory: NotebookGridFactory;
}

export class NotebookGridWidgetFactory extends ABCWidgetFactory<
  NotebookGridDocWidget,
  INotebookModel
> {
  constructor(options: IOptions) {
    super(options);
    this._notebookGridFactory = options.notebookGridFactory;
  }

  protected createNewWidget(
    context: DocumentRegistry.IContext<INotebookModel>
  ): NotebookGridDocWidget {
    const widget = new NotebookGridDocWidget({
      context,
      content: new NotebookGridPanel(context, this._notebookGridFactory)
    });
    return widget;
  }

  private _notebookGridFactory: NotebookGridFactory;
}
