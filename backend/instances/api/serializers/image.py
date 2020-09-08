from rest_framework import serializers

from instances.models import Image


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['name', 'tag', 'image_url']
