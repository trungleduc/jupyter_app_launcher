import { ILauncherApp } from './../../token';
import { ILauncherConfiguration } from '../../schema';
import { IDict, IPanelFactory } from '../../token';
import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { CustomMarkdownContext } from './custom_context';
import { ServiceManager } from '@jupyterlab/services';
import { TextModelFactory } from '@jupyterlab/docregistry';
import { UUID } from '@lumino/coreutils';
import { MarkdownViewer } from '@jupyterlab/markdownviewer';

const MIMETYPE = 'text/markdown';

export class MarkdownFactory implements IPanelFactory {
  constructor(private options: MarkdownFactory.IOptions) {}
  async create(
    config: ILauncherConfiguration,
    args: IDict
  ): Promise<ILauncherApp | void> {
    if (!config.sourceCode) {
      console.error('Missing source code!');
      return;
    }
    await this.options.manager.ready;
    const rendermime = this.options.rendermime.clone();
    const factory = new TextModelFactory();
    const path = UUID.uuid4() + '.md';
    const context = new CustomMarkdownContext({
      manager: this.options.manager,
      factory,
      path
    });
    await context.model.initialize();
    await context.sessionContext.initialize();
    context.model.fromString(config.sourceCode);
    context.resolveReady();
    await context.ready;
    const renderer = rendermime.createRenderer(MIMETYPE);
    const content = new MarkdownViewer({ context, renderer });
    content.title.closable = true;
    content.title.label = config.title;

    return { panel: content };
  }
}

export namespace MarkdownFactory {
  export interface IOptions {
    rendermime: IRenderMimeRegistry;
    manager: ServiceManager;
  }
}
