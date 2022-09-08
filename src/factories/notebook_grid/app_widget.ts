import { SimplifiedOutputArea } from '@jupyterlab/outputarea';
import { toArray } from '@lumino/algorithm';
import { GridStackItem } from './item';
import { PromiseDelegate } from '@lumino/coreutils';
import { Message, MessageLoop } from '@lumino/messaging';
import { Panel, Widget } from '@lumino/widgets';
import { GridStack } from 'gridstack';

import { DashboardCellView, IAppModel } from '../../token';
import { AppModel } from './app_model';

export class AppWidget extends Panel {
  constructor(options: AppWidget.IOptions) {
    super();
    this.node.id = options.id;
    this.title.label = options.label;
    this.title.closable = true;
    this._model = options.model;
    this._gridHost = document.createElement('div');
    this._gridHost.className = 'grid-stack';
    this._gridHost.classList.add('jp-App-Launcher-gridhost');
    this.node.appendChild(this._gridHost);
    this.node.style.overflow = 'auto';
    this._grid = GridStack.init(
      {
        float: true,
        column: 12,
        margin: 2,
        cellHeight: 40,
        styleInHead: true,
        disableOneColumnMode: true
      },
      this._gridHost
    );
    this.render();
    window.dispatchEvent(new Event('resize'));
  }

  /**
   * A promise that is fulfilled when the model is ready.
   */
  get ready(): Promise<void> {
    return this._ready.promise;
  }

  get model(): IAppModel {
    return this._model;
  }
  get gridWidgets(): Array<GridStackItem> {
    return this._gridElements;
  }

  dispose(): void {
    if (this.isDisposed) {
      return;
    }
    this._model.dispose();
    super.dispose();
  }
  addGridItem(out: GridStackItem): void {
    this._gridElements.push(out);
    const info = out.info;
    const id = out.cellIdentity;
    if (info && info.hidden) {
      return;
    }
    const options: { [key: string]: any } = {
      id,
      autoPosition: true,
      noMove: true,
      noResize: true,
      locked: true
    };
    if (info && info.row !== null && info.col !== null) {
      options.x = info.col;
      options.y = info.row;
      options.width = info.width;
      options.height = info.height;
      options.autoPosition = false;
    }

    MessageLoop.sendMessage(out, Widget.Msg.BeforeAttach);

    this._grid.addWidget(out.node, options);

    MessageLoop.sendMessage(out, Widget.Msg.AfterAttach);
    this.updateGridItem(id, info);
  }

  updateGridItem(id: string, info?: DashboardCellView): void {
    const items = this._grid.getGridItems();
    const item = items?.find(value => value.gridstackNode?.id === id);
    if (!item) {
      return;
    }
    let option: { [key: string]: any };
    if (!info) {
      option = { autoPosition: true };
    } else {
      option = {
        x: info.col,
        y: info.row,
        w: info.width,
        h: info.height,
        noMove: true,
        noResize: true,
        locked: true
      };
    }
    this._grid.update(item, option);
  }

  render(): void {
    const cellList = toArray(this._model.cells.iter());
    cellList.forEach(cell => {
      const el = this._model.createCell(cell);

      this.addGridItem(el);
      this._model
        .executeCell(cell, el.cellOutput as SimplifiedOutputArea)
        .catch(console.error);
    });
  }

  protected onCloseRequest(msg: Message): void {
    this._model.dispose();
    super.onCloseRequest(msg);
  }

  private _model: IAppModel;

  private _ready = new PromiseDelegate<void>();

  private _grid: GridStack;

  private _gridHost: HTMLElement;

  private _gridElements: GridStackItem[] = [];
}

export namespace AppWidget {
  export interface IOptions {
    id: string;
    label: string;
    model: AppModel;
  }
}
