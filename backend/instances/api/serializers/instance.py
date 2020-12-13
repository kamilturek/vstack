from rest_framework import serializers

from instances.api.serializers.image import ImageSerializer
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
    volumes = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )

    class Meta:
        model = Instance
        fields = ['id', 'name', 'container_id', 'status', 'image', 'volumes']


class InstanceExportSerializer(serializers.ModelSerializer):
    image = serializers.CharField(source='image.name')
    volumes = serializers.SerializerMethodField()

    def get_volumes(self, obj: Instance) -> str:
        return ', '.join(obj.volumes.values_list('name', flat=True))

    class Meta:
        model = Instance
        fields = ['name', 'container_id', 'image', 'volumes']
