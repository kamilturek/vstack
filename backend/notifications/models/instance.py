from django.db import models

from instances.models import Instance
from notifications.models.notification import Notification, NotificationType


class InstanceNotification(Notification):
    actor = models.ForeignKey(
        Instance,
        related_name='notifications',
        on_delete=models.CASCADE,
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
