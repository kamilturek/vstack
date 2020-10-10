from channels.generic.websocket import AsyncJsonWebsocketConsumer

from django.core.exceptions import ValidationError

from utils.api.ws import WebSocketTokenAuthentication


class NotificationConsumer(AsyncJsonWebsocketConsumer):
    authentication_class = WebSocketTokenAuthentication

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.auth = self.authentication_class(self.scope)

    async def disconnect(self, code):
        if self.auth.is_authenticated:
            await self.disable_group()

    async def receive_json(self, content):
        await self.authenticate(content)

    async def notification_new(self, event):
        await self.send_json(event['data'])

    async def authenticate(self, content):
        if not self.auth.is_authenticated:
            try:
                await self.auth.authenticate(content['token'])
            except ValidationError:
                return self.close()
            else:
                await self.enable_group()

    async def enable_group(self):
        await self.channel_layer.group_add(f'user_{self.scope["user"].id}', self.channel_name)

    async def disable_group(self):
        await self.channel_layer.group_discard(f'user_{self.scope["user"].id}', self.channel_name)
