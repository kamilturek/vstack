from __future__ import absolute_import

from celery import shared_task

from instances.models import Instance
from instances.services.virtualization import DockerVirtualization
from notifications.models import (
    InstanceFailedNotification,
    InstanceFinishedNotification,
    InstanceScheduledNotification
)
from utils.decorators import asyncable


virtualization = DockerVirtualization


@asyncable
@shared_task
def run_instance(id: int) -> None:
    instance = Instance.objects.get(id=id)
    InstanceScheduledNotification.send(
        instance.accessors[0],
        instance
    )
    try:
        vm = virtualization.run_vm(instance.name, str(instance.image))
        instance.container_id = vm.id
        instance.save()
    except Exception as e:
        InstanceFailedNotification.send(
            instance.accessors[0],
            instance
        )
        print(e)
    else:
        InstanceFinishedNotification.send(
            instance.accessors[0],
            instance
        )


@asyncable
@shared_task
def remove_instance(id: int) -> None:
    instance = Instance.objects.get(id=id)
    vm = virtualization.get_vm(instance.container_id)
    vm.remove()
