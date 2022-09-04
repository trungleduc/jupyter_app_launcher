import { WidgetTracker } from '@jupyterlab/apputils';
import { ISignal, Signal } from '@lumino/signaling';
import { Widget } from '@lumino/widgets';
import { requestAPI } from './handler';

import { IAppTracker } from './token';

export class AppTracker extends WidgetTracker<Widget> implements IAppTracker {
  constructor(options: WidgetTracker.IOptions, appName: string) {
    super(options);
    this._appName = appName;
  }
  async add(widget: Widget): Promise<void> {
    widget.disposed.connect(async () => {
      this._widgetDisposed.emit(widget);
      await this.updateRunningInstance();
    });
    super.add(widget);
    await this.updateRunningInstance();
  }
  get widgetDisposed(): ISignal<this, Widget> {
    return this._widgetDisposed;
  }
  get instanceChanged(): ISignal<IAppTracker, void> {
    return this._instanceChanged;
  }
  set runningInstance(value: any[]) {
    this._runningInstances = value;
  }

  get runningInstance(): any[] {
    return this._runningInstances;
  }
  async updateRunningInstance(): Promise<void> {
    if (this._appName === 'JupyterLite') {
      return;
    }
    this._runningInstances = await requestAPI<any[]>({
      method: 'POST',
      body: JSON.stringify({
        method: 'request_running_app'
      })
    });
    this._instanceChanged.emit();
  }
  private _runningInstances: any[] = [];
  private _widgetDisposed = new Signal<this, Widget>(this);
  private _instanceChanged = new Signal<this, void>(this);
  private _appName: string;
}
