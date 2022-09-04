import { PageConfig, URLExt } from '@jupyterlab/coreutils';

import { ServerConnection } from '@jupyterlab/services';
import { ILauncherConfiguration } from './schema';

/**
 * Call the API extension
 *
 * @param endPoint API REST end point for the extension
 * @param init Initial values for the request
 * @returns The response body interpreted as JSON
 */
export async function requestAPI<T>(
  init: RequestInit = {},
  endPoint = ''
): Promise<T> {
  // Make request to Jupyter API
  const settings = ServerConnection.makeSettings();
  const requestUrl = URLExt.join(
    settings.baseUrl,
    'jupyterlab-app-launcher',
    endPoint
  );

  let response: Response;
  try {
    response = await ServerConnection.makeRequest(requestUrl, init, settings);
  } catch (error) {
    throw new ServerConnection.NetworkError(error);
  }

  let data: any = await response.text();

  if (data.length > 0) {
    try {
      data = JSON.parse(data);
    } catch (error) {
      console.log('Not a JSON response body.', response);
    }
  }

  if (!response.ok) {
    throw new ServerConnection.ResponseError(response, data.message || data);
  }

  return data;
}

export async function fetchLauncherData(
  appName: string
): Promise<ILauncherConfiguration[]> {
  let launcherData: ILauncherConfiguration[] = [];
  if (appName === 'JupyterLite') {
    const settingString = PageConfig.getOption('settingsOverrides');
    if (settingString.length > 0) {
      const setting = JSON.parse(settingString);
      launcherData = setting['appLauncherData']['config'];
    }
  } else {
    launcherData = await requestAPI<ILauncherConfiguration[]>({
      method: 'POST',
      body: JSON.stringify({
        method: 'init_launcher'
      })
    });
  }
  return launcherData;
}
