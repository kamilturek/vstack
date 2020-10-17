from django.db import models

from instances.managers.instance import InstanceManager
from instances.models.image import Image
from instances.services.virtualization import DockerVirtualization
from utils.mixins import AccessMixin


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

    virtualization = DockerVirtualization

    @property
    def access_permission(self) -> str:
        return 'access_instance'

    @property
    def status(self) -> str:
        if self.container_id is None:
            return 'Corrupted'
        vm = self.virtualization.get_vm(self.container_id)
        return vm.status

    def run(self) -> None:
        vm = self.virtualization.run_vm(self.name, str(self.image))
        self.container_id = vm.id
        self.save()

    def remove(self) -> None:
        vm = self.virtualization.get_vm(self.container_id)
        vm.remove()

    def stop(self) -> None:
        vm = self.virtualization.get_vm(self.container_id)
        vm.stop()

    def start(self) -> None:
        vm = self.virtualization.get_vm(self.container_id)
        vm.start()

    def restart(self) -> None:
        vm = self.virtualization.get_vm(self.container_id)
        vm.restart()
