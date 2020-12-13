# type: ignore[attr-defined]

import csv
from typing import Dict, List, Optional

from django.http import HttpResponse


class Exporter:
    filename: Optional[str] = None
    columns: Optional[List[str]] = None

    def __init__(self, serialized_data: List[Dict[str, str]]) -> None:
        self.serialized_data = serialized_data

    def export(self) -> HttpResponse:
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename={self.filename}'

        writer = csv.writer(response)
        writer.writerow(self.columns)
        for row in self.serialized_data:
            writer.writerow(list(row.values()))

        return response
