from rest_framework import serializers

from instances.api.serializers.image import ImageSerializer
from instances.api.serializers.volume import VolumeSerializer
from instances.models import Instance, Volume


class InstanceSerializer(serializers.ModelSerializer):
    volumes = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Volume.objects.all()
    )

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
        fields = ['id', 'name', 'container_id', 'image', 'volumes']
        read_only_fields = ['container_id']


class InstanceRetrieveSerializer(serializers.ModelSerializer):
    image = ImageSerializer()
    volumes = VolumeSerializer(many=True)

    class Meta:
        model = Instance
        fields = ['id', 'name', 'container_id', 'status', 'image', 'volumes']
