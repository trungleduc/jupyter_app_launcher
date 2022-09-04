from subprocess import Popen, PIPE, STDOUT
from typing import Dict, List, Tuple, Union

from ..utils import check_url, get_free_port
from .base_factory import BaseFactory


class URLFactory(BaseFactory):
    def __init__(self, config: Dict, **kwargs) -> None:
        super().__init__(config, **kwargs)
        self._instances: Dict[str, Popen] = {}

    @staticmethod
    def name():
        return 'local-server'

    def process(self, request: Dict, **kwargs) -> str:
        base_url, p = self.start_server(
            self._config.get('args', []),
            self._config.get('cwd', None),
            self._config.get('source'),
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

    def start_server(
        self, args: List[str], cwd: str, source: str
    ) -> Tuple[str, Union[None, Popen]]:
        port = get_free_port()
        p = None
        url_list = source.split('$PORT')
        if len(url_list) > 1:
            url_suffix = source.split('$PORT')[1]
        else:
            url_suffix = ''
        base_url = f'proxy/{port}{url_suffix}'
        if len(args) > 0:
            cmd = [arg.replace('$PORT', str(port)) for arg in args]
            p = Popen(cmd, stdout=PIPE, stderr=PIPE, cwd=cwd)

        if check_url(source.replace('$PORT', str(port))):
            return base_url, p
        else:
            return None, None
