import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './handler';

/**
 * Initialization data for the jupyter_app_launcher extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyter_app_launcher:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyter_app_launcher is activated!');

    requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The jupyter_app_launcher server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default plugin;
