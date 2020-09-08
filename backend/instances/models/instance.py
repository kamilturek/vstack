from django.db import models

import docker
from docker.models.containers import Container

from instances.models.image import Image


class Instance(models.Model):
    name = models.TextField()
    image = models.ForeignKey(
        Image,
        on_delete=models.PROTECT,
        related_name='instances'
    )
    container_id = models.TextField(
        null=True
    )

    def __str__(self) -> str:
        return f'{self.container_id} {self.image}'

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
