import { IFrame } from '@jupyterlab/apputils';
import { PageConfig } from '@jupyterlab/coreutils';
import { UUID, PromiseDelegate } from '@lumino/coreutils';

import { requestAPI } from '../../handler';
import { ILauncherConfiguration } from '../../schema';
import { IDict, IPanelFactory } from '../../token';
import { ILauncherApp } from './../../token';
import { Dialog } from '@jupyterlab/apputils';

function showTemporaryPopup(title: string) {
  const dialog = new Dialog({
    title: 'Loading',
    body: 'Please wait a few seconds until ' + title + ' has started...',
    buttons: []
  });

  // Show the dialog
  dialog.launch();

  // Close the dialog after 3 seconds
  setTimeout(() => {
    dialog.dispose();
  }, 3000);
}

export class LocalServerFactory implements IPanelFactory {
  async create(
    config: ILauncherConfiguration,
    args: IDict
  ): Promise<ILauncherApp | void> {
    const instanceId = UUID.uuid4();
    const serverUrlPromise = requestAPI<string>({
      method: 'POST',
      body: JSON.stringify({
        method: 'request_resources',
        id: config.id,
        instanceId
      })
    });

    var createNewWindow: boolean = false;
    if (config.args) {
      createNewWindow = (config.options as IDict)['createNewWindow'];
    }

    var widget: IFrame | undefined;

    if (!createNewWindow) {
      widget = new IFrame({
        sandbox: [
          'allow-same-origin',
          'allow-scripts',
          'allow-downloads',
          'allow-modals',
          'allow-popups'
        ]
      });
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
    } else {
      showTemporaryPopup(config.title);
    }
    const baseUrl = PageConfig.getBaseUrl();
    const ready = new PromiseDelegate<void>();

    serverUrlPromise.then(url => {
      if (createNewWindow) {
        window.open(baseUrl + url, '_blank');
      } else {
        if (widget !== undefined) {
          widget.url = baseUrl + url;
        }
      }
      ready.resolve();
    });
    if (widget !== undefined) {
      return { panel: widget, ready: ready.promise };
    } else {
      return;
    }
  }
}
