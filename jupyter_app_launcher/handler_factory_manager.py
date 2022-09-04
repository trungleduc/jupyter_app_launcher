from typing import Dict, Union, Type
from .factories.base_factory import BaseFactory


class HandlerFactoryManager:
    def __init__(self) -> None:
        self._factoryMap = {}

    def registerFactory(
        self,
        Cls: Type[BaseFactory],
    ) -> None:
        name = Cls.name()
        if name in self._factoryMap:
            print(f'Factory for {name} is already registered, replacing!')
        self._factoryMap[name] = Cls

    def create_factory(
        self, name: str, options: Dict, **kwargs
    ) -> Union[BaseFactory, None]:
        if name in self._factoryMap:
            Cls = self._factoryMap.get(name)
            return Cls(options, **kwargs)
        else:
            return None
