from rest_framework import serializers

from instances.api.serializers.image import ImageSerializer
from instances.models import Instance
from instances.tasks import run_instance


class InstanceSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        instance = super().create(validated_data)
        instance.grant_access(self.user)
        instance.run()
        return instance

    @property
    def user(self):
        return self.context['request'].user

    class Meta:
        model = Instance
        fields = ['id', 'name', 'container_id', 'image']
        read_only_fields = ['container_id']


class InstanceRetrieveSerializer(serializers.ModelSerializer):
    image = ImageSerializer()

    class Meta:
        model = Instance
        fields = ['id', 'name', 'container_id', 'status', 'image']
