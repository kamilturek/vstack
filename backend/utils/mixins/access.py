from abc import ABCMeta, abstractmethod

from guardian import shortcuts

from django.db.models import QuerySet

from users.models import User


class AccessMixin:
    __metaclass__ = ABCMeta

    @property
    @abstractmethod
    def access_permission(self) -> str:
        ...

    @property
    def accessors(self) -> QuerySet:
        return shortcuts.get_users_with_perms(
            self
        )

    def grant_access(self, user: User) -> None:
        shortcuts.assign_perm(
            self.access_permission,
            user,
            self
        )

    def remove_access(self, user: User) -> None:
        shortcuts.remove_perm(
            self.access_permission,
            user,
            self
        )

    def has_access(self, user: User) -> None:
        return user.has_perm(
            self.access_permission,
            self
        )
