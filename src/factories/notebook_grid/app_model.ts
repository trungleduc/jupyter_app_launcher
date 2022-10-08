import {
  ICellModel,
  MarkdownCell,
  MarkdownCellModel,
  RawCell,
  RawCellModel
} from '@jupyterlab/cells';
import { IEditorMimeTypeService } from '@jupyterlab/codeeditor';
import { Context } from '@jupyterlab/docregistry';
import * as nbformat from '@jupyterlab/nbformat';
import {
  INotebookModel,
  INotebookTracker,
  NotebookPanel,
  StaticNotebook
} from '@jupyterlab/notebook';
import { IObservableUndoableList } from '@jupyterlab/observables';
import { OutputAreaModel, SimplifiedOutputArea } from '@jupyterlab/outputarea';
import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { ServiceManager } from '@jupyterlab/services';
import { IExecuteReplyMsg } from '@jupyterlab/services/lib/kernel/messages';

import { DashboardCellView, IAppModel } from '../../token';
import {
  createNotebookContext,
  createNotebookPanel
} from './create_notebook_panel';
import { GridStackItem } from './item';

export const VIEW = 'grid_default';
export class AppModel implements IAppModel {
  constructor(private options: AppModel.IOptions) {
    this._notebook = options.notebook;
  }
  /**
   * Whether the handler is disposed.
   */
  get isDisposed(): boolean {
    return this._isDisposed;
  }

  dispose(): void {
    if (this.isDisposed) {
      return;
    }
    this._isDisposed = true;
    this._context.dispose();
    this._notebookPanel.dispose();
  }
  get notebook(): nbformat.INotebookContent {
    return this._notebook;
  }

  get rendermime(): IRenderMimeRegistry {
    return this.options.rendermime;
  }

  get cells(): IObservableUndoableList<ICellModel> {
    return this._context.model.cells;
  }

  get context(): Context<INotebookModel> {
    return this._context;
  }
  get panel(): NotebookPanel {
    return this._notebookPanel;
  }
  public async initialize(): Promise<void> {
    this._context = await createNotebookContext({
      manager: this.options.manager
    });
    this._context.model.fromJSON(this.options.notebook);
    this._notebookPanel = createNotebookPanel(
      this._context,
      this.options.rendermime
    );
    // TODO Shameless hack, need to do better!
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.options.tracker.widgetAdded.emit(this._notebookPanel);
  }

  private _getCellInfo(id: string): DashboardCellView | undefined {
    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells.get(i);

      if (cell.id === id) {
        const data = cell.sharedModel.getMetadata().extensions as Record<
          string,
          any
        >;
        return data?.jupyter_dashboards?.views[VIEW];
      }
    }

    return undefined;
  }

  createCell(cellModel: ICellModel): GridStackItem {
    let item: GridStackItem;
    const info = this._getCellInfo(cellModel.id);
    switch (cellModel.type) {
      case 'code': {
        const outputareamodel = new OutputAreaModel({ trusted: true });
        const out = new SimplifiedOutputArea({
          model: outputareamodel,
          rendermime: this.options.rendermime
        });
        item = new GridStackItem(cellModel.id, out, info);
        break;
      }
      case 'markdown': {
        const markdownCell = new MarkdownCell({
          model: cellModel as MarkdownCellModel,
          rendermime: this.options.rendermime,
          contentFactory: this.options.contentFactory,
          editorConfig: this.options.editorConfig.markdown,
          updateEditorOnShow: false
        });
        markdownCell.inputHidden = false;
        markdownCell.rendered = true;
        Private.removeElements(markdownCell.node, 'jp-Collapser');
        Private.removeElements(markdownCell.node, 'jp-InputPrompt');
        item = new GridStackItem(cellModel.id, markdownCell, info);
        break;
      }
      default: {
        const rawCell = new RawCell({
          model: cellModel as RawCellModel,
          contentFactory: this.options.contentFactory,
          editorConfig: this.options.editorConfig.raw,
          updateEditorOnShow: false
        });
        rawCell.inputHidden = false;
        Private.removeElements(rawCell.node, 'jp-Collapser');
        Private.removeElements(rawCell.node, 'jp-InputPrompt');
        item = new GridStackItem(cellModel.id, rawCell, info);
        break;
      }
    }

    return item;
  }
  public async executeCell(
    cell: ICellModel,
    output: SimplifiedOutputArea
  ): Promise<IExecuteReplyMsg | undefined> {
    if (cell.type !== 'code') {
      return;
    }
    const source = cell.value.text;
    const rep = await SimplifiedOutputArea.execute(
      source,
      output,
      this._context.sessionContext
    );
    return rep;
  }

  private _notebook: nbformat.INotebookContent;
  private _notebookPanel: NotebookPanel;
  private _context: Context<INotebookModel>;
  private _isDisposed = false;
}

export namespace AppModel {
  export interface IOptions {
    notebook: nbformat.INotebookContent;
    manager: ServiceManager;
    rendermime: IRenderMimeRegistry;
    tracker: INotebookTracker;
    contentFactory: NotebookPanel.IContentFactory;
    mimeTypeService: IEditorMimeTypeService;
    editorConfig: StaticNotebook.IEditorConfig;
    notebookConfig: StaticNotebook.INotebookConfig;
  }
}

namespace Private {
  /**
   * Remove children by className from an HTMLElement.
   */
  export function removeElements(node: HTMLElement, className: string): void {
    const elements = node.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
      elements[i].remove();
    }
  }
}
