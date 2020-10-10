from typing import Literal

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from polymorphic.models import PolymorphicModel

from django.db import models, transaction

from notifications.api.serializers import NotificationSerializer
from users.models import User


NotificationType = Literal['SUCCESS', 'INFO', 'WARNING', 'ERROR']


class Notification(PolymorphicModel):
    """
    Base Notification model
    Derived models should introduce actor foreign key

    actor = models.ForeignKey(
        <ActorModel>,
        related_name='notifications',
        on_delete=models.CASCADE,
    )
    """
    recipent = models.ForeignKey(
        User,
        related_name='notifications',
        on_delete=models.CASCADE,
    )
    read = models.BooleanField(
        default=False,
    )
    created = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self) -> str:
        return f'{self.recipent} / {self.created}'

    @classmethod
    @transaction.atomic
    def send(cls, recipent: User, actor: models.Model) -> 'Notification':
        notification = cls.objects.create(
            recipent=recipent,
            actor=actor
        )
        notification._send_to_channel()
        return notification

    def _send_to_channel(self) -> None:
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f'user_{self.recipent.id}',
            {
                'type': 'notification.new',
                'data': NotificationSerializer(self).data,
            }
        )

    @property
    def content(self) -> str:
        raise NotImplementedError

    @property
    def type(self) -> NotificationType:
        raise NotImplementedError
