from argparse import ArgumentError
import json
import os
import sys

from .utils import create_abs_path, parse_config


def build_lite():
    argv = sys.argv
    if len(argv) == 1:
        raise ArgumentError('Missing arguments')
    operator = argv[1]
    if operator == 'build':
        if len(argv) != 4:
            raise ArgumentError('Missing arguments')
        cwd = os.getcwd()
        source = create_abs_path(argv[2], cwd)
        raw_config = parse_config(source)
        config = [
            x
            for x in raw_config
            if x['type'] not in ['notebook-voila', 'local-server']
        ]

        dest = create_abs_path(argv[3], cwd)
        overrides = os.path.join(dest, 'overrides.json')
        if os.path.exists(overrides):
            with open(overrides, 'r') as f:
                data = json.load(f)
        else:
            data = {}
        data['appLauncherData'] = {'config': config}
        with open(overrides, 'w') as f:
            json.dump(data, f)
    else:
        print('no-op')
