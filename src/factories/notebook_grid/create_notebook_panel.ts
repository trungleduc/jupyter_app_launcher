import { Context } from '@jupyterlab/docregistry';
import {
  INotebookModel,
  NotebookModelFactory,
  NotebookPanel,
  Notebook
} from '@jupyterlab/notebook';
import { ServiceManager } from '@jupyterlab/services';
import { UUID } from '@lumino/coreutils';
import { IRenderMimeRegistry } from '@jupyterlab/rendermime';

import { CustomContext } from './custom_context';
import { IEditorServices } from '@jupyterlab/codeeditor';

export async function createNotebookContext(options: {
  manager: ServiceManager.IManager;
}): Promise<Context<INotebookModel>> {
  const factory = new NotebookModelFactory({
    disableDocumentWideUndoRedo: false
  });
  const manager = options.manager;
  const path = UUID.uuid4() + '.ipynb';

  await manager.ready;

  const context = new CustomContext({
    manager,
    factory,
    path,
    kernelPreference: {
      shouldStart: true,
      canStart: true,
      shutdownOnDispose: true,
      name: manager.kernelspecs.specs?.default
    }
  });

  // await context.model.initialize();
  await context.sessionContext.initialize();
  await context.sessionContext.session?.kernel?.info;
  return context;
}

export function createNotebook(options: {
  rendermime: IRenderMimeRegistry;
  editorServices: IEditorServices;
}): Notebook {
  const { rendermime, editorServices } = options;
  const editorFactory = editorServices.factoryService.newInlineEditor;
  return new Notebook({
    rendermime,
    contentFactory: new Notebook.ContentFactory({ editorFactory }),
    mimeTypeService: editorServices.mimeTypeService
  });
}

export function createNotebookPanel(options: {
  context: Context<INotebookModel>;
  rendermime: IRenderMimeRegistry;
  editorServices: IEditorServices;
}): NotebookPanel {
  const { context, rendermime, editorServices } = options;
  const content = createNotebook({ rendermime, editorServices });
  return new NotebookPanel({
    content,
    context
  });
}
