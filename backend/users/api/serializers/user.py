from rest_framework import serializers

from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    avatar = serializers.CharField(source='profile.avatar.url', required=False)

    class Meta:
        model = User
        fields = ['username', 'password', 'avatar']
