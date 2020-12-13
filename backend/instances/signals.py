from django.db.models.signals import pre_delete
from django.dispatch import receiver

from instances.models import Instance, Volume


@receiver(pre_delete, sender=Instance)
def remove_instance(sender, instance, **kwargs):
    if instance.container_id:
        instance.remove()


@receiver(pre_delete, sender=Volume)
def remove_volume(sender, instance, **kwargs):
    if instance.vol_id:
        instance.remove()
