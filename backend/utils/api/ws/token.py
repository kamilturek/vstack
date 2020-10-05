from channels.auth import login
from channels.db import database_sync_to_async
from rest_framework.authtoken.models import Token

from django.core.exceptions import ValidationError

from utils.api.ws.auth import AsyncWebSocketAuthentication


class WebSocketTokenAuthentication(AsyncWebSocketAuthentication):
    BACKEND = 'django.contrib.auth.backends.ModelBackend'

    def __init__(self, scope):
        self.user = None
        self.scope = scope

    async def authenticate(self, key):
        try:
            self.user = await self.get_user(key)
            await login(self.scope, self.user, backend=self.BACKEND)
        except Token.DoesNotExist:
            raise ValidationError('Cannot authenticate with provided token.')

    @property
    def is_authenticated(self):
        return self.user is not None

    @database_sync_to_async
    def get_user(self, key):
        return Token.objects.get(key=key).user
