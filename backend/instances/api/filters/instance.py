from django_filters import FilterSet

from instances.models import Instance


class InstanceFilter(FilterSet):
    class Meta:
        model = Instance
        fields = {
            'id': ['exact', 'in'],
        }
