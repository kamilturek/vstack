from django.db.models.signals import post_save
from django.dispatch import receiver

import docker

from instances.models import Instance


@receiver(post_save, sender=Instance)
def create_container(sender, instance, created, **kwargs):
    if created:
        instance.create_container()
