from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.permissions import IsAuthenticated

from instances.api.serializers import InstanceSerializer, InstanceRetrieveSerializer
from instances.models import Instance


class InstanceViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Instance.objects.permitted(self.request.user)

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return InstanceRetrieveSerializer
        return InstanceSerializer

    @action(methods=['post'], detail=True)
    def stop(self, request: Request, pk: int) -> Response:
        instance = self.get_object()
        instance.stop()
        return self.retrieve(request)

    @action(methods=['post'], detail=True)
    def start(self, request: Request, pk: int) -> Response:
        instance = self.get_object()
        instance.start()
        return self.retrieve(request)
