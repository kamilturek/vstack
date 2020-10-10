from abc import ABC, abstractmethod


class AsyncWebSocketAuthentication(ABC):

    @abstractmethod
    async def authenticate(self, key):
        ...

    @property
    @abstractmethod
    def is_authenticated(self):
        ...
