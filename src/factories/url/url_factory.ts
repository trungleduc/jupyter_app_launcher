import { IFrame } from '@jupyterlab/apputils';
import { UUID } from '@lumino/coreutils';

import { requestAPI } from '../../handler';
import { ILauncherConfiguration } from '../../schema';
import { IDict, IPanelFactory } from '../../token';
import { ILauncherApp } from './../../token';

export class URLFactory implements IPanelFactory {
  async create(
    config: ILauncherConfiguration,
    args: IDict
  ): Promise<ILauncherApp | void> {
    const source = config.source as string;
    if (typeof source !== 'string') {
      return;
    }
    const instanceId = UUID.uuid4();
    const options: IFrame.IOptions = {};
    if (config.args) {
      const sandbox = (config.args as IDict)['sandbox'];
      const referrerPolicy = (config.args as IDict)['referrerPolicy'];
      const createNewWindow = (config.args as IDict)['createNewWindow'];
      if (createNewWindow) {
        window.open(source, '_blank');
        return;
      }
      if (sandbox) {
        options['sandbox'] = sandbox;
      }
      if (referrerPolicy) {
        options['referrerPolicy'] = referrerPolicy;
      }
    }
    const widget = new IFrame(options);
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
    widget.url = source;
    return { panel: widget };
  }
}
