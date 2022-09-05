import { NotebookVoilaFactory } from './factories/notebook_voila/notebook_voila_factory';
import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { IEditorServices } from '@jupyterlab/codeeditor';
import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';
import { IRenderMimeRegistry } from '@jupyterlab/rendermime';

import { NotebookFactory } from './factories/notebook/notebook_factory';
import { NotebookGridFactory } from './factories/notebook_grid/notebook_grid_factory';
import { PanelFactoryManager } from './factory_manager';
import { IPanelFactoryManager } from './token';
import { LocalServerFactory } from './factories/local_server/local_server_factory';
import { URLFactory } from './factories/url/url_factory';
import { MarkdownFactory } from './factories/markdown/markdown_factory';

export const panelFactoryPlugin: JupyterFrontEndPlugin<IPanelFactoryManager> = {
  id: 'jupyter_app_launcher:panel-factory-manager',
  autoStart: true,
  requires: [
    IRenderMimeRegistry,
    INotebookTracker,
    IEditorServices,
    NotebookPanel.IContentFactory
  ],
  activate: (
    app: JupyterFrontEnd,
    rendermime: IRenderMimeRegistry,
    tracker: INotebookTracker,
    editorServices: IEditorServices,
    contentFactory: NotebookPanel.IContentFactory
  ): IPanelFactoryManager => {
    const manager = new PanelFactoryManager();
    const notebookGridFactory = new NotebookGridFactory({
      manager: app.serviceManager,
      rendermime,
      tracker,
      contentFactory,
      mimeTypeService: editorServices.mimeTypeService
    });
    manager.registerFactory('notebook-grid', notebookGridFactory);

    const notebookFactory = new NotebookFactory({
      app
    });
    manager.registerFactory('notebook', notebookFactory);

    const notebookVoilaFactory = new NotebookVoilaFactory();
    manager.registerFactory('notebook-voila', notebookVoilaFactory);

    const localServerFactory = new LocalServerFactory();
    manager.registerFactory('local-server', localServerFactory);

    const urlFactory = new URLFactory();
    manager.registerFactory('url', urlFactory);

    const markdownFactory = new MarkdownFactory({
      manager: app.serviceManager,
      rendermime
    });
    manager.registerFactory('markdown', markdownFactory);

    return manager;
  },
  provides: IPanelFactoryManager
};
