from __future__ import absolute_import

from celery import shared_task

from instances.models import Instance
from notifications.models import InstanceScheduledNotification


@shared_task
def run_instance(instance: Instance) -> None:
    try:
        instance.run()
    except Exception as e:
        instance.delete()
        raise e
    else:
        InstanceScheduledNotification.send(
            instance.accessors[0],
            instance
        )


@shared_task
def remove_instance(instance: Instance) -> None:
    instance.remove()
