import { PageConfig } from '@jupyterlab/coreutils';
import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { MainAreaWidget } from '@jupyterlab/apputils';
import { ILauncher } from '@jupyterlab/launcher';
import { IRunningSessionManagers } from '@jupyterlab/running';
import { LabIcon } from '@jupyterlab/ui-components';

import { AppTracker } from './app_tracker';
import { fetchLauncherData } from './handler';
import { panelFactoryPlugin } from './manager_plugin';
import { RunningLauncherApp } from './running_launcher_app';
import { ILauncherConfiguration } from './schema';
import { IAppTracker, IPanelFactoryManager } from './token';
import { iconFromSvgString, iconFromText } from './tools';
import { BoxPanel } from '@lumino/widgets';
import { PromiseDelegate } from '@lumino/coreutils';

/**
 * Initialization data for the jupyter_app_launcher extension.
 */
const plugin: JupyterFrontEndPlugin<IAppTracker> = {
  id: 'jupyter_app_launcher:plugin',
  autoStart: true,
  requires: [ILauncher, IPanelFactoryManager],
  optional: [IRunningSessionManagers],
  activate,
  provides: IAppTracker
};

async function activate(
  app: JupyterFrontEnd,
  launcher: ILauncher,
  panelFactory: IPanelFactoryManager,
  runningManager?: IRunningSessionManagers
): Promise<IAppTracker> {
  console.log('JupyterLab extension jupyter_app_launcher is activated!');

  const namespace = 'jupyterlab-app-launcher';
  const { commands } = app;
  const appName = PageConfig.getOption('appName');
  const widgetTracker = new AppTracker({ namespace }, appName);
  const launcherData = await fetchLauncherData(appName);

  function createCommand(config: ILauncherConfiguration, idx: number): void {
    let icon: LabIcon;
    if (config.icon) {
      icon = iconFromSvgString(config.icon);
    } else {
      icon = iconFromText(config.title);
    }

    commands.addCommand(config.id, {
      label: config.title,
      caption: config.description,
      icon,
      execute: async args => {
        const factory = panelFactory.getFactory(config.type);
        if (!factory) {
          return;
        }
        const wrapper = new BoxPanel({
          direction: 'top-to-bottom',
          spacing: 0
        });
        const reveal = new PromiseDelegate<void>();
        if (config.type !== 'notebook') {
          wrapper.title.label = config.title;
          const main = new MainAreaWidget({
            content: wrapper,
            reveal: reveal.promise
          });
          app.shell.add(main, 'main');
        }
        factory
          .create(config, args)
          .then(launcherApp => {
            if (launcherApp) {
              const { panel, ready } = launcherApp;
              wrapper.addWidget(panel);
              void widgetTracker.add(panel);
              void widgetTracker.save(panel);
              if (ready) {
                ready.then(() => reveal.resolve(void 0));
              } else {
                reveal.resolve(void 0);
              }
            }
          })
          .catch(console.error);
      }
    });
    launcher.add({
      command: config.id,
      category: config.catalog ?? 'Jupyter App',
      rank: idx
    });
  }

  launcherData.forEach((item, idx) => createCommand(item, idx));
  if (appName !== 'JupyterLite') {
    await widgetTracker.updateRunningInstance();
    if (runningManager) {
      let currentRunning: RunningLauncherApp[] = [];
      runningManager.add({
        name: 'Launcher application',
        running: () => {
          currentRunning = widgetTracker.runningInstance.map(
            instance =>
              new RunningLauncherApp({
                factoryId: instance['factory_id'],
                instanceId: instance['instance_id'],
                title: instance['config']['title'],
                type: instance['config']['type'],
                tracker: widgetTracker
              })
          );

          return currentRunning;
        },
        shutdownAll: () => {
          currentRunning.forEach(item => {
            item.shutdown();
          });
        },
        refreshRunning: () => {
          return void 0;
        },
        runningChanged: widgetTracker.instanceChanged,
        shutdownLabel: 'Shut Down',
        shutdownAllLabel: 'Shut Down All',
        shutdownAllConfirmationText:
          'Are you sure you want to permanently shut down all running applications?'
      });
    }
  }
  return widgetTracker;
}

export default [panelFactoryPlugin, plugin];
