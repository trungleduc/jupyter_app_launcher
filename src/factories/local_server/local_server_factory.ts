import { IFrame } from '@jupyterlab/apputils';
import { PageConfig } from '@jupyterlab/coreutils';
import { UUID, PromiseDelegate } from '@lumino/coreutils';

import { requestAPI } from '../../handler';
import { ILauncherConfiguration } from '../../schema';
import { IDict, IPanelFactory } from '../../token';
import { ILauncherApp } from './../../token';

export class LocalServerFactory implements IPanelFactory {
  async create(
    config: ILauncherConfiguration,
    args: IDict
  ): Promise<ILauncherApp> {
    const instanceId = UUID.uuid4();
    const serverUrlPromise = requestAPI<string>({
      method: 'POST',
      body: JSON.stringify({
        method: 'request_resources',
        id: config.id,
        instanceId
      })
    });
    const widget = new IFrame({
      sandbox: [
        'allow-same-origin',
        'allow-scripts',
        'allow-downloads',
        'allow-modals',
        'allow-popups'
      ]
    });
    const baseUrl = PageConfig.getBaseUrl();
    widget.title.label = config.title;
    widget.title.closable = true;
    widget.disposed.connect(async () => {
      await requestAPI<string>({
        method: 'POST',
        body: JSON.stringify({
          method: 'terminate_resources',
          id: config.id,
          instanceId
        })
      });
    });
    const ready = new PromiseDelegate<void>();

    serverUrlPromise.then(url => {
      widget.url = baseUrl + url;
      ready.resolve();
    });
    return { panel: widget, ready: ready.promise };
  }
}
