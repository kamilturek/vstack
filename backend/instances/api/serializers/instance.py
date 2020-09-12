from rest_framework import serializers

from instances.api.serializers.image import ImageSerializer
from instances.models import Instance


class InstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instance
        fields = ['id', 'name', 'container_id', 'image']
        read_only_fields = ['container_id']


class InstanceRetrieveSerializer(serializers.ModelSerializer):
    image = ImageSerializer()

    class Meta:
        model = Instance
        fields = ['id', 'name', 'container_id', 'image']
