from django.db.models.signals import pre_delete
from django.dispatch import receiver

from instances.models import Instance


@receiver(pre_delete, sender=Instance)
def remove_instance(sender, instance, **kwargs):
    if instance.container_id:
        instance.remove()
