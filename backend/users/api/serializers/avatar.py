from typing import Dict

from drf_extra_fields import fields
from rest_framework import serializers

from django.core.files.base import ContentFile

from users.models import UserProfile


class AvatarSerializer(serializers.Serializer):
    avatar = fields.Base64ImageField()

    def create(self, validated_data: Dict[str, ContentFile]) -> UserProfile:
        profile = self.context['user'].profile
        profile.avatar = validated_data.pop('avatar')
        profile.save()
        return profile
