from rest_framework import serializers

from instances.models import Volume


class VolumeSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        volume = super().create(validated_data)
        volume.grant_access(self.user)
        volume.create()
        return volume

    @property
    def user(self):
        return self.context['request'].user

    class Meta:
        model = Volume
        fields = ['id', 'name']
