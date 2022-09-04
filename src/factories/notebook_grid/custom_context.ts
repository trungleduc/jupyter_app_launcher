import { INotebookModel } from '@jupyterlab/notebook';
import { Context } from '@jupyterlab/docregistry';

export class CustomContext extends Context<INotebookModel> {
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
}
