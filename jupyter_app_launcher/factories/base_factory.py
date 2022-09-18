from abc import ABC, abstractmethod
from typing import Any, Dict


class BaseFactory(ABC):
    def __init__(self, config: Dict, **kwargs) -> None:
        super().__init__(**kwargs)
        self._config = config

    @staticmethod
    @abstractmethod
    def name(
        self,
    ) -> str:
        pass

    def get_type(self) -> str:
        return self._config.get('type', None)

    @abstractmethod
    def process(self, request: Dict, **kwargs) -> Any:
        pass

    @abstractmethod
    def terminate(self, request: Dict, **kwargs) -> Any:
        pass

    @abstractmethod
    def terminate_all(self) -> None:
        pass

    @abstractmethod
    def get_instances(self) -> Dict:
        pass
