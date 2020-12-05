from django.db import models

from instances.managers.volume import VolumeManager
from instances.services.virtualization import DockerVirtualization
from utils.mixins import AccessMixin


class Volume(models.Model, AccessMixin):
    name = models.TextField(unique=True)

    objects = VolumeManager()

    class Meta:
        permissions = (
            ('access_volume', 'Access volumes'),
        )

    def __str__(self) -> str:
        return self.name

    virtualization = DockerVirtualization

    @property
    def access_permission(self) -> str:
        return 'access_volume'

    def create(self) -> None:
        from instances.tasks import create_volume
        create_volume(self.id)

    def remove(self) -> None:
        from instances.tasks import remove_volume
        remove_volume(self.id)
