from rest_framework import viewsets

from notifications.api.serializers import NotificationSerializer
from notifications.models import Notification


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.order_by('-created')
    serializer_class = NotificationSerializer
