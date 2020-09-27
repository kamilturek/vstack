from typing import Dict

from drf_extra_fields import fields
from rest_framework import serializers

from django.core.files.base import ContentFile

from users.models import User


class AvatarSerializer(serializers.Serializer):
    avatar = fields.Base64ImageField()

    def create(self, validated_data: Dict[str, ContentFile]) -> User:
        user = self.context['user']
        user.avatar = validated_data.pop('avatar')
        user.save()
        return user
