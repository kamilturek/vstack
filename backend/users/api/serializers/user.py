from typing import Dict

from rest_framework import serializers

from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    avatar = serializers.CharField(source='profile.avatar.url', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'avatar']

    def create(self, validated_data: Dict) -> User:
        return User.objects.create_user(**validated_data)

    def update(self, instance: User, validated_data: Dict) -> User:
        self.update_password(instance, validated_data)
        return super().update(instance, validated_data)

    def update_password(self, instance: User, validated_data: Dict) -> None:
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
