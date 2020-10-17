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
            return 'Not Available'
        vm = self.virtualization.get_vm(self.container_id)
        return vm.status

    def run(self) -> None:
        from instances.tasks import run_instance
        run_instance(self.id)

    def remove(self) -> None:
        from instances.tasks import remove_instance
        remove_instance(self.id)

    def stop(self) -> None:
        vm = self.virtualization.get_vm(self.container_id)
        vm.stop()

    def start(self) -> None:
        vm = self.virtualization.get_vm(self.container_id)
        vm.start()

    def restart(self) -> None:
        vm = self.virtualization.get_vm(self.container_id)
        vm.restart()
