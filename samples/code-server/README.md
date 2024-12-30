# [VSCODE web based](https://github.com/coder/code-server) with jupyter

## Install vscode
> Run in jupyter terminal  

```bash
curl -fsSL https://code-server.dev/install.sh | sh
```

## Setting up server parameters

> In the server config, you need to add the following lines

**jupyter_lab_config.py**
```py
from tornado import websocket
websocket_max_message_size = 1048 * 1024 * 1024
# fix module
setattr(websocket, "_default_max_message_size", websocket_max_message_size)
# fix config
c.NotebookApp.tornado_settings = {"websocket_max_message_size": websocket_max_message_size}
```

## Setting up jupyter_app_launcher with open in new TAB

Open [juyter_app_launcher config file](https://jupyter-app-launcher.readthedocs.io/en/latest/usage.html#configuration-file-location)

> Add application launch parameters

```
- title: Open VSCODE
  description: Open web based VSCODE
  icon: /usr/lib/code-server/lib/vscode/out/media/code-icon.svg
  source: http://localhost:$PORT/
  cwd: ./
  type: local-server
  args:
    - code-server
    - --auth=none
    - --app-name='Remote VSCode Server'
    - --disable-telemetry
    - --disable-update-check
    - --disable-workspace-trust
    - --bind-addr=0.0.0.0:$PORT
  catalog: VSCODE
```