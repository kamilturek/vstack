from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer

from django.core.exceptions import ValidationError

from notifications.models import Notification
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
        print(event)
        pass

    async def authenticate(self, content):
        if not self.auth.is_authenticated:
            try:
                await self.auth.authenticate(content['token'])
            except ValidationError:
                return self.close()
            else:
                await self.enable_group()
                await self.resend_unread()

    async def enable_group(self):
        await self.channel_layer.group_add(f'user_{self.scope["user"].id}', self.channel_name)

    async def disable_group(self):
        await self.channel_layer.group_discard(f'user_{self.scope["user"].id}', self.channel_name)

    @database_sync_to_async
    def resend_unread(self):
        unread = Notification.objects.filter(
            read=False,
            recipent=self.auth.user,
        ).order_by(
            'created'
        )
        for notification in unread:
            notification._send_to_channel()
