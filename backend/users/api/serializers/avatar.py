from rest_framework import serializers


class AvatarSerializer(serializers.Serializer):
    avatar = serializers.ImageField()
