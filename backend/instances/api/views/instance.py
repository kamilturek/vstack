from rest_framework import viewsets

from instances.api.serializers import InstanceSerializer
from instances.models import Instance


class InstanceViewSet(viewsets.ModelViewSet):
    queryset = Instance.objects.all()
    serializer_class = InstanceSerializer
