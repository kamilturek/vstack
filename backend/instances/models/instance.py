from django.db import models

import docker
from docker.models.containers import Container

from instances.managers.instance import InstanceManager
from instances.models.image import Image
from utils.access import AccessMixin


class Instance(models.Model, AccessMixin):
    name = models.TextField()
    image = models.ForeignKey(
        Image,
        on_delete=models.PROTECT,
        related_name='instances'
    )
    container_id = models.TextField(
        null=True
    )

    objects = InstanceManager()

    class Meta:
        permissions = (
            ('access_instance', 'Access instance'),
        )

    def __str__(self) -> str:
        return f'{self.container_id} {self.image}'

    @property
    def access_permission(self) -> str:
        return 'access_instance'

    @property
    def status(self) -> str:
        client = docker.from_env()
        container = client.containers.get(self.container_id)
        return container.status

    def run(self) -> Container:
        client = docker.from_env()
        container = client.containers.run(
            image=str(self.image),
            command='bash',
            name=self.name,
            detach=True,
            tty=True,
        )
        self.container_id = container.short_id
        self.save()
        return container

    def remove(self, force: bool = False) -> None:
        client = docker.from_env()
        container = client.containers.get(self.container_id)
        container.remove(force=force)
