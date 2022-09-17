import json
import os
import pathlib
import socket
import time
from typing import Dict, List
from uuid import uuid4

import requests
import yaml
from jsonschema import validate

with open(
    pathlib.Path(__file__).parent.resolve() / 'schema' / 'config.schema.json',
    'r',
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
        with open(abs_path, 'r') as f:
            content = f.read()
    except Exception:
        pass
    return content


def parse_config(path: str) -> List[Dict]:
    config_file = os.path.join(path, 'config.yaml')
    with open(config_file, 'r') as f:
        yaml_data: List[Dict] = yaml.load(f, Loader=yaml.CLoader)
    ret = []
    for item in yaml_data:
        item['id'] = str(uuid4())
        if validate_data(item, path):
            ret.append(item)
    return ret


def validate_data(data: Dict, cwd: str) -> bool:
    try:
        validate(data, SCHEMA)
        source_config = data.get('source', None)
        type_config = data.get('type')
        if source_config is not None:
            data['sourceCode'] = path_to_res(source_config, cwd)
        if type_config not in ['url', 'local-server']:
            data['source'] = create_abs_path(source_config, cwd)
        if data.get('icon', None) is not None:
            data['icon'] = path_to_res(data['icon'], cwd)
        cwd_config = data.get('cwd', None)
        if cwd_config is not None:
            data['cwd'] = create_abs_path(cwd_config, cwd)
        return True
    except Exception:
        return False


def get_free_port() -> int:
    soc = socket.socket()
    soc.bind(('localhost', 0))
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
