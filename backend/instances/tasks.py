from __future__ import absolute_import

from celery import shared_task

from instances.models import Instance
from notifications.models import (
    InstanceFailedNotification,
    InstanceFinishedNotification,
    InstanceScheduledNotification
)


@shared_task
def run_instance(instance: Instance) -> None:
    InstanceScheduledNotification.send(
        instance.accessors[0],
        instance
    )
    try:
        instance.run()
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


@shared_task
def remove_instance(instance: Instance) -> None:
    instance.remove()
