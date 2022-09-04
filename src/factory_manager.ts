import { ILauncherConfiguration } from './schema';
import { IPanelFactory, IPanelFactoryManager } from './token';

export class PanelFactoryManager implements IPanelFactoryManager {
  registerFactory(
    type: ILauncherConfiguration['type'],
    factory: IPanelFactory
  ): void {
    if (this._factoryMap.has(type)) {
      console.warn(`Factory for ${type} is already registered, replacing!`);
    }
    this._factoryMap.set(type, factory);
  }

  getFactory(type: ILauncherConfiguration['type']): IPanelFactory | undefined {
    return this._factoryMap.get(type);
  }
  get isDisposed(): boolean {
    return this._isDisposed;
  }
  dispose(): void {
    if (this._isDisposed) {
      return;
    }
  }
  private _isDisposed = false;
  private _factoryMap: Map<ILauncherConfiguration['type'], IPanelFactory> =
    new Map();
}
