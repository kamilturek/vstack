from django.db import models, transaction

from instances.models import Instance
from notifications.models.notification import Notification, NotificationType
from users.models import User


class InstanceNotification(Notification):
    actor = models.ForeignKey(
        Instance,
        related_name='notifications',
        on_delete=models.CASCADE,
    )

    @classmethod
    @transaction.atomic
    def send(cls, recipent: User, instance: Instance) -> None:
        super().send(
            recipent=recipent,
            actor=instance,
        )


class InstanceScheduledNotification(InstanceNotification):

    @property
    def content(self) -> str:
        return f'Deployment of {self.actor.name} has been scheduled.'

    @property
    def type(self) -> NotificationType:
        return 'INFO'


class InstanceFinishedNotification(InstanceNotification):

    @property
    def content(self) -> str:
        return f'Deployment of {self.actor.name} has been finished.'

    @property
    def type(self) -> NotificationType:
        return 'SUCCESS'
