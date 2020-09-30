from abc import ABC, abstractmethod


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


class Virtualization(ABC):
    """
    Represents virtualization method
    Example: Vagrant, Docker
    """

    @classmethod
    @abstractmethod
    def get_vm(self, id: str) -> VM:
        ...
