from rest_framework import viewsets

from instances.api.serializers import ImageSerializer
from instances.models import Image


class ImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
