import { Context } from '@jupyterlab/docregistry';
import { PromiseDelegate } from '@lumino/coreutils';

export class CustomMarkdownContext extends Context {
  /**
   * Save the document contents to disk.
   */
  async save(): Promise<void> {
    await this.ready;
    return;
  }

  async saveAs(): Promise<void> {
    await this.ready;
    return;
  }

  async revert(): Promise<void> {
    await this.ready;
    return;
  }

  get isReady(): boolean {
    return true;
  }
  get ready(): Promise<void> {
    return this._customReadyPromise.promise;
  }

  resolveReady(): void {
    this._customReadyPromise.resolve(void 0);
  }
  private _customReadyPromise = new PromiseDelegate<void>();
}
