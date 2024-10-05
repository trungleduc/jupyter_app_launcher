import json
import logging
import os
import pathlib
import socket
import time
from typing import Dict, List
from uuid import uuid4

import requests
import yaml
from jsonschema import validate

logger = logging.getLogger("ServerApp")

with open(
    pathlib.Path(__file__).parent.resolve() / "schema" / "config.schema.json",
    "r",
) as f:
    SCHEMA = json.load(f)


def create_abs_path(path: str, cwd: str) -> str:
    if os.path.isabs(path):
        abs_path = path
    else:
        abs_path = os.path.abspath(os.path.join(cwd, path))
    return abs_path


def path_to_res(path: str, cwd: str) -> str:
    content: str = None
    abs_path = create_abs_path(path, cwd)
    try:
        with open(abs_path, "r") as f:
            content = f.read()
    except Exception:
        pass
    return content


def parse_config(path: str, config_file: str) -> List[Dict]:
    with open(config_file, "r") as f:
        yaml_data: List[Dict] = yaml.load(f, Loader=yaml.CLoader)
    ret = []
    for item in yaml_data:
        item["id"] = str(uuid4())
        if validate_data(item, path):
            ret.append(item)
    return ret


def validate_data(data: Dict, cwd: str) -> bool:
    try:
        validate(data, SCHEMA)
        source_config = data.get("source", None)
        type_config = data.get("type")
        if type_config == "jupyterlab-commands":
            if isinstance(data["source"], str):
                logger.error(
                    "[jupyter_app_launcher] jupyterlab-commands launcher expects a list of objects as source."
                )
                return False
        else:
            if source_config is not None:
                data["sourceCode"] = path_to_res(source_config, cwd)
            if type_config not in ["url", "local-server", "terminal"]:
                data["source"] = create_abs_path(source_config, cwd)
            if type_config == "url":
                data["source"] = os.path.expandvars(source_config)

        if data.get("icon", None) is not None:
            data["icon"] = path_to_res(data["icon"], cwd)
        cwd_config = data.get("cwd", None)
        if cwd_config is not None:
            data["cwd"] = create_abs_path(cwd_config, cwd)
        return True
    except Exception as e:
        logger.error(f"[jupyter_app_launcher] Error {e}.")
        return False


def get_free_port() -> int:
    soc = socket.socket()
    soc.bind(("localhost", 0))
    return soc.getsockname()[1]


def check_url(url: str, timeout=120) -> bool:
    rate = 0.5
    n_check = timeout / rate
    check = 0
    while True:
        try:
            requests.get(url)
        except requests.exceptions.RequestException:
            if check < n_check:
                check += 1
                time.sleep(rate)
            else:
                break
        else:
            return True
    return False
