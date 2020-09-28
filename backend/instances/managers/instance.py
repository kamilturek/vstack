from guardian import shortcuts

from django.db import models

from users.models import User


class InstanceQuerySet(models.QuerySet):

    def _permitted(self, user: User) -> 'InstanceQuerySet':
        return shortcuts.get_objects_for_user(
            user,
            'access_instance',
            self
        )

    def permitted(self, user: User) -> 'InstanceQuerySet':
        permitted = self._permitted(user)
        return self.filter(id__in=permitted.values_list('id', flat=True))


class InstanceManager(models.Manager):

    def get_queryset(self) -> InstanceQuerySet:
        return InstanceQuerySet(self.model, using=self._db)

    def permitted(self, user: User) -> InstanceQuerySet:
        return self.get_queryset().permitted(user)
