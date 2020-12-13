from rest_framework import permissions


class CanDeleteVolumePermission(permissions.BasePermission):
    message = 'Volume is in use.'

    def has_permission(self, request, view):
        volume = view.get_object()
        return volume.instances.count() == 0
