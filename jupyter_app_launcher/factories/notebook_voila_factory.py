from subprocess import Popen, PIPE, STDOUT
import time
from typing import Dict, List, Tuple, Union

from ..utils import get_free_port
from .base_factory import BaseFactory


class NotebookVoilaFactory(BaseFactory):
    def __init__(self, config: Dict, **kwargs) -> None:
        super().__init__(config, **kwargs)
        self._instances: Dict[str, Popen] = {}

    @staticmethod
    def name():
        return 'notebook-voila'

    def process(self, request: Dict, **kwargs) -> str:
        lab_base_prefix = request.get('labBasePrefix')
        base_url, p = self.start_voila(
            self._config['source'],
            self._config.get('args', {}),
            lab_base_prefix,
        )

        self._instances[request['instanceId']] = p
        return base_url

    def terminate(self, request: Dict) -> None:
        p = self._instances.pop(request['instanceId'], None)
        if p:
            p.terminate()

    def terminate_all(self) -> None:
        for p in self._instances.values():
            p.terminate()
        self._instances = {}

    def get_instances(self) -> Dict:
        return self._instances

    def start_voila(
        self,
        notebook_path: str,
        voila_args: Union[Dict, List],
        lab_base_prefix: str,
    ) -> Tuple[str, Popen]:

        port = get_free_port()
        base_url = f'proxy/absolute/{port}/'
        should_add_ip = True
        custom_args = []
        if isinstance(voila_args, dict):
            for item in voila_args.items():
                custom_args.append(f'--{item[0]}={item[1]}')
                if should_add_ip and 'Voila.ip' in item[0]:
                    should_add_ip = False
        elif isinstance(voila_args, list):
            for item in voila_args:
                custom_args.append(f'--{item}')
                if should_add_ip and 'Voila.ip' in item:
                    should_add_ip = False

        if should_add_ip:
            custom_args.append('--Voila.ip=0.0.0.0')
        args = [
            'voila',
            notebook_path,
            '--no-browser',
            f'--port={port}',
            f'--Voila.base_url={lab_base_prefix}{base_url}',
        ] + custom_args
        p = Popen(args, stdout=PIPE, stderr=PIPE)
        check = 0
        while True:
            if check > 200:   # Timeout is 200*0.5 seconds
                p.terminate()
                break
            data = p.stderr.readline()
            if 'is running at' in data.decode('utf-8'):
                break
            else:
                check += 1
                time.sleep(0.5)
        return base_url, p
