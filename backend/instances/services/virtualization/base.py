from abc import ABC, abstractmethod
from typing import List


class VM(ABC):
    """
    Represents actual VM (or container) on virtualization level
    """

    @property
    @abstractmethod
    def id(self) -> str:
        ...

    @property
    @abstractmethod
    def status(self) -> str:
        ...

    @abstractmethod
    def remove(self) -> None:
        ...

    @abstractmethod
    def stop(self) -> None:
        ...

    @abstractmethod
    def start(self) -> None:
        ...

    @abstractmethod
    def restart(self) -> None:
        ...


class Volume(ABC):
    """
    Represents actual volume on virtualization level
    """

    @property
    @abstractmethod
    def id(self) -> str:
        ...

    @abstractmethod
    def remove(self) -> None:
        ...


class Virtualization(ABC):
    """
    Represents virtualization method
    Example: Vagrant, Docker
    """

    @classmethod
    @abstractmethod
    def get_vm(self, id: str) -> VM:
        ...

    @classmethod
    @abstractmethod
    def get_volume(cls, name: str) -> Volume:
        ...

    @classmethod
    @abstractmethod
    def run_vm(cls, name: str, image: str, volumes: List[str]) -> VM:
        ...

    @classmethod
    @abstractmethod
    def create_volume(cls, name: str) -> Volume:
        ...
