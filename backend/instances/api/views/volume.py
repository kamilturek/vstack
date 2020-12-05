from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from instances.api.serializers import VolumeSerializer
from instances.models import Volume


class VolumeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = VolumeSerializer

    def get_queryset(self):
        return Volume.objects.permitted(self.request.user)
