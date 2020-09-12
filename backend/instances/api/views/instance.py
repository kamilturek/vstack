from rest_framework import viewsets

from instances.api.serializers import InstanceSerializer, InstanceRetrieveSerializer
from instances.models import Instance


class InstanceViewSet(viewsets.ModelViewSet):
    queryset = Instance.objects.all()

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return InstanceRetrieveSerializer
        return InstanceSerializer
