import { AppTracker } from './app_tracker';
import { IRunningSessions } from '@jupyterlab/running';
import { LabIcon } from '@jupyterlab/ui-components';
import { requestAPI } from './handler';
import { iconFromSvgString, iconFromText } from './tools';

export class RunningLauncherApp implements IRunningSessions.IRunningItem {
  constructor(
    private options: {
      factoryId: string;
      instanceId: string;
      title: string;
      type: string;
      icon?: string;
      tracker: AppTracker;
    }
  ) {}
  /**
   * This is no-op because we do not do anything on server click event
   */
  open(): void {
    /** no-op */
  }

  icon(): LabIcon {
    let icon: LabIcon;
    if (this.options.icon) {
      icon = iconFromSvgString(this.options.icon);
    } else {
      icon = iconFromText(this.options.title);
    }
    return icon;
  }
  label(): string {
    return `${this.options.title} (${this.options.type})`;
  }
  shutdown(): void {
    requestAPI<string>({
      method: 'POST',
      body: JSON.stringify({
        method: 'terminate_resources',
        id: this.options.factoryId,
        instanceId: this.options.instanceId
      })
    })
      .then(() => {
        this.options.tracker.updateRunningInstance();
      })
      .catch(console.error);
  }
}
