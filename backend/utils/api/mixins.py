# type: ignore[attr-defined]

from typing import Optional

from rest_framework.decorators import action
from rest_framework.request import Request

from django.http import HttpResponse

from utils.api.exporter import Exporter


class ExportMixin:
    exporter_class: Optional[Exporter] = None

    @action(methods=['get'], detail=False)
    def export(self, request: Request) -> HttpResponse:
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return self.exporter_class(serializer.data).export()
