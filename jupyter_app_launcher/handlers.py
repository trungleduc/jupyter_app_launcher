import json
from os import path as osp, getenv, listdir
import os
from typing import Dict, List, Union
from jupyter_server.base.handlers import APIHandler
from jupyter_server.utils import url_path_join
import tornado
from jupyter_core.paths import jupyter_path

from .factories.url_factory import URLFactory

from .factories.base_factory import BaseFactory

from .factories.notebook_voila_factory import NotebookVoilaFactory

from .handler_factory_manager import HandlerFactoryManager

from .utils import parse_config

PATH_PREFIX = "jupyter_app_launcher"


class JupyterAppLauncher(APIHandler):
    checked_data = False
    config_data = []
    handler_factory_manager: HandlerFactoryManager = None
    launcher_handler: Dict[str, BaseFactory] = {}

    @tornado.web.authenticated
    def post(self):
        request = self.get_json_body()
        method = f'_{request["method"]}'
        if hasattr(self, method):
            result = getattr(self, method)(request)
            self.finish(json.dumps(result))
        else:
            raise tornado.web.HTTPError(500, f"Method {method} is not implemented")

    def _request_resources(self, request: Dict) -> Union[Dict, None]:
        handler = JupyterAppLauncher.launcher_handler.get(request["id"], None)
        if handler:
            return handler.process(request)

    def _terminate_resources(self, request: Dict) -> Union[Dict, None]:
        handler = JupyterAppLauncher.launcher_handler.get(request["id"], None)
        if handler:
            return handler.terminate(request)

    def _request_running_app(self, request: Dict) -> List:
        ret = []
        for factory_id, factory in JupyterAppLauncher.launcher_handler.items():
            if factory:
                instances = factory.get_instances()
                for k in instances:
                    ret.append(
                        {
                            "factory_id": factory_id,
                            "instance_id": k,
                            "config": factory._config,
                        }
                    )
        return ret

    def _init_launcher(self, request: Dict) -> Dict:
        if not JupyterAppLauncher.checked_data:
            jupyter_data_path = jupyter_path()
            config_path = [osp.join(p, PATH_PREFIX) for p in jupyter_data_path]
            config_path.append(os.getcwd())
            app_launcher_path_env = getenv("JUPYTER_APP_LAUNCHER_PATH", None)
            if app_launcher_path_env:
                config_path.append(app_launcher_path_env)

            for path in config_path:
                if not osp.exists(path):
                    continue
                for any_file in listdir(path):
                    file_name, file_ext = osp.splitext(any_file)
                    if file_ext not in [".yml", ".yaml"] or not file_name.startswith(
                        "jp_app_launcher"
                    ):
                        continue
                    config_file = osp.join(path, any_file)
                    if not osp.isfile(config_file):
                        continue

                    ret = parse_config(path, config_file)

                    manager = JupyterAppLauncher.handler_factory_manager
                    for item in ret:
                        JupyterAppLauncher.launcher_handler[item["id"]] = (
                            manager.create_factory(item["type"], item)
                        )
                    JupyterAppLauncher.config_data.extend(ret)
        JupyterAppLauncher.checked_data = True

        return JupyterAppLauncher.config_data


def setup_handlers(web_app):
    manager = HandlerFactoryManager()
    manager.registerFactory(NotebookVoilaFactory)
    manager.registerFactory(URLFactory)
    JupyterAppLauncher.handler_factory_manager = manager

    host_pattern = ".*$"
    base_url = web_app.settings["base_url"]
    route_pattern = url_path_join(base_url, "jupyterlab-app-launcher")
    handlers = [(route_pattern, JupyterAppLauncher)]
    web_app.add_handlers(host_pattern, handlers)
