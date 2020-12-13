from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.permissions import IsAuthenticated

from instances.api.exporters import InstanceExporter
from instances.api.filters import InstanceFilter
from instances.api.serializers import InstanceSerializer, InstanceRetrieveSerializer, InstanceExportSerializer
from instances.models import Instance
from utils.api.mixins import ExportMixin


class InstanceViewSet(viewsets.ModelViewSet, ExportMixin):
    filter_backends = [DjangoFilterBackend]
    filterset_class = InstanceFilter
    permission_classes = [IsAuthenticated]
    exporter_class = InstanceExporter

    def get_queryset(self):
        return Instance.objects.permitted(self.request.user)

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return InstanceRetrieveSerializer
        if self.action == 'export':
            return InstanceExportSerializer
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

    @action(methods=['post'], detail=True)
    def restart(self, request: Request, pk: int) -> Response:
        instance = self.get_object()
        instance.restart()
        return self.retrieve(request)
