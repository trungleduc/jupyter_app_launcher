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

import { editorServices } from '@jupyterlab/codemirror';
import { CustomContext } from './custom_context';

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

  await context.model.initialize();
  await context.sessionContext.initialize();
  await context.sessionContext.session?.kernel?.info;
  return context;
}

export function createNotebook(rendermime: IRenderMimeRegistry): Notebook {
  const editorFactory = editorServices.factoryService.newInlineEditor.bind(
    editorServices.factoryService
  );
  return new Notebook({
    rendermime,
    contentFactory: new Notebook.ContentFactory({ editorFactory }),
    mimeTypeService: editorServices.mimeTypeService
  });
}

export function createNotebookPanel(
  context: Context<INotebookModel>,
  rendermime: IRenderMimeRegistry
): NotebookPanel {
  const content = createNotebook(rendermime);
  return new NotebookPanel({
    content,
    context
  });
}
