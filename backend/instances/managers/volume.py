from guardian import shortcuts

from django.db import models

from users.models import User


class VolumeQuerySet(models.QuerySet):

    def _permitted(self, user: User) -> 'VolumeQuerySet':
        return shortcuts.get_objects_for_user(
            user,
            'access_volume',
            self
        )

    def permitted(self, user: User) -> 'VolumeQuerySet':
        permitted = self._permitted(user)
        return self.filter(id__in=permitted.values_list('id', flat=True))


class VolumeManager(models.Manager):

    def get_queryset(self) -> VolumeQuerySet:
        return VolumeQuerySet(self.model, using=self._db)

    def permitted(self, user: User) -> VolumeQuerySet:
        return self.get_queryset().permitted(user)
