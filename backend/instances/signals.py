from django.db.models.signals import post_delete
from django.dispatch import receiver

from instances import tasks
from instances.models import Instance


@receiver(post_delete, sender=Instance)
def remove_instance(sender, instance, **kwargs):
    if instance.container_id:
        tasks.remove_instance(instance)
