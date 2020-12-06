from django.db import models

from instances.models import Volume
from notifications.models.notification import Notification, NotificationType
from utils.models.non_polymorphic_cascade import NON_POLYMORPHIC_CASCADE


class VolumeNotification(Notification):
    actor = models.ForeignKey(
        Volume,
        related_name='notifications',
        on_delete=NON_POLYMORPHIC_CASCADE
    )


class VolumeScheduledNotification(VolumeNotification):

    @property
    def content(self) -> str:
        return f'Deployment of {self.actor.name} has been scheduled.'

    @property
    def type(self) -> NotificationType:
        return 'INFO'


class VolumeFinishedNotification(VolumeNotification):

    @property
    def content(self) -> str:
        return f'Deployment of {self.actor.name} has been finished.'

    @property
    def type(self) -> NotificationType:
        return 'SUCCESS'


class VolumeFailedNotification(VolumeNotification):

    @property
    def content(self) -> str:
        return f'Deployment of {self.actor.name} has failed.'

    @property
    def type(self) -> NotificationType:
        return 'ERROR'
