from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

import docker

from instances.models import Instance


@receiver(post_save, sender=Instance)
def run_instance(sender, instance, created, **kwargs):
    if created:
        try:
            instance.run()
        except Exception as ex:
            instance.delete()
            raise ex


@receiver(post_delete, sender=Instance)
def remove_instance(sender, instance, **kwargs):
    if instance.container_id:
        instance.remove(force=True)
