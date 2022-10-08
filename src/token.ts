import { IExecuteReplyMsg } from '@jupyterlab/services/lib/kernel/messages';
import { IWidgetTracker } from '@jupyterlab/apputils';
import { ICellModel } from '@jupyterlab/cells';
import { Context } from '@jupyterlab/docregistry';
import { INotebookModel, NotebookPanel } from '@jupyterlab/notebook';
import { IObservableUndoableList } from '@jupyterlab/observables';
import { SimplifiedOutputArea } from '@jupyterlab/outputarea';
import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { Token } from '@lumino/coreutils';
import { IDisposable } from '@lumino/disposable';
import { ISignal } from '@lumino/signaling';
import { Widget } from '@lumino/widgets';

import { GridStackItem } from './factories/notebook_grid/item';
import { ILauncherConfiguration } from './schema';

export interface IDict<T = any> {
  [key: string]: T;
}

export interface IAppModel extends IDisposable {
  context: Context<INotebookModel>;
  panel: NotebookPanel;
  cells: IObservableUndoableList<ICellModel>;
  rendermime: IRenderMimeRegistry;
  initialize(): Promise<void>;
  createCell(cellModel: ICellModel): GridStackItem;
  executeCell(
    cell: ICellModel,
    output: SimplifiedOutputArea
  ): Promise<IExecuteReplyMsg | undefined>;
}

export interface IKernelExecutor extends IDisposable {
  startKernel(): Promise<void>;
  executeCode(code: string, outputarea: SimplifiedOutputArea): void;
}

export interface IAppTracker extends IWidgetTracker<Widget> {
  widgetDisposed: ISignal<IAppTracker, Widget>;
  runningInstance: any[];
  instanceChanged: ISignal<IAppTracker, void>;
}

export interface ILauncherApp {
  panel: Widget;
  ready?: Promise<void>;
}

export interface IPanelFactory {
  create(
    config: ILauncherConfiguration,
    args?: IDict
  ): Promise<ILauncherApp | void>;
}

export interface IPanelFactoryManager extends IDisposable {
  registerFactory(
    type: ILauncherConfiguration['type'],
    factory: IPanelFactory
  ): void;

  getFactory(type: ILauncherConfiguration['type']): IPanelFactory | undefined;
}

export type DashboardCellView = {
  /**
   * If cell output+widget are visible in the layout.
   */
  hidden?: boolean;
  /**
   * Logical row position.
   */
  row?: number;
  /**
   * Logical column position.
   */
  col?: number;
  /**
   * Logical width.
   */
  width?: number;
  /**
   * Logical height.
   */
  height?: number;
  /**
   * Lock item.
   */
  locked?: boolean;
};

/**
 * The app tracker token.
 */
export const IAppTracker = new Token<IAppTracker>(
  'jupyterlab-app-launcher:IAppTracker'
);
export const IPanelFactoryManager = new Token<IPanelFactoryManager>(
  'jupyterlab-app-launcher:IPanelFactoryManager'
);
