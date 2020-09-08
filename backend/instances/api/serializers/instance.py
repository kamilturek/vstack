from rest_framework import serializers

from instances.models import Instance


class InstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instance
        fields = ['id', 'name', 'container_id', 'image']
        read_only_fields = ['container_id']
