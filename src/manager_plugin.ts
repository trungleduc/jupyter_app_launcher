import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { IEditorServices } from '@jupyterlab/codeeditor';
import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';
import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { IThemeManager } from '@jupyterlab/apputils';
import { IDefaultFileBrowser } from '@jupyterlab/filebrowser';
import { CommandsFactory } from './factories/commands';
import { LocalServerFactory } from './factories/local_server';
import { MarkdownFactory } from './factories/markdown';
import { NotebookFactory } from './factories/notebook';
import { NotebookGridFactory } from './factories/notebook_grid';
import { NotebookVoilaFactory } from './factories/notebook_voila';
import { TerminalFactory } from './factories/terminal';
import { URLFactory } from './factories/url/url_factory';
import { PanelFactoryManager } from './factory_manager';
import { IPanelFactoryManager } from './token';
import { IDocumentManager } from '@jupyterlab/docmanager';

export const panelFactoryPlugin: JupyterFrontEndPlugin<IPanelFactoryManager> = {
  id: 'jupyter_app_launcher:panel-factory-manager',
  autoStart: true,
  requires: [
    IRenderMimeRegistry,
    INotebookTracker,
    IEditorServices,
    NotebookPanel.IContentFactory,
    IDocumentManager,
    IDefaultFileBrowser
  ],
  optional: [IThemeManager],
  activate: (
    app: JupyterFrontEnd,
    rendermime: IRenderMimeRegistry,
    tracker: INotebookTracker,
    editorServices: IEditorServices,
    contentFactory: NotebookPanel.IContentFactory,
    documentManager: IDocumentManager,
    fileBrowser: IDefaultFileBrowser,
    themeManager?: IThemeManager
  ): IPanelFactoryManager => {
    const manager = new PanelFactoryManager();
    const notebookGridFactory = new NotebookGridFactory({
      manager: app.serviceManager,
      rendermime,
      tracker,
      contentFactory,
      mimeTypeService: editorServices.mimeTypeService,
      editorServices
    });
    manager.registerFactory('notebook-grid', notebookGridFactory);

    const notebookFactory = new NotebookFactory({
      app,
      documentManager,
      fileBrowser
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

    const cmdFactory = new CommandsFactory({
      commands: app.commands
    });
    manager.registerFactory('jupyterlab-commands', cmdFactory);

    const terminalFactory = new TerminalFactory({ app, themeManager });
    manager.registerFactory('terminal', terminalFactory);

    return manager;
  },
  provides: IPanelFactoryManager
};
