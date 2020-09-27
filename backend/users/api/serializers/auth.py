from rest_framework import serializers
from rest_framework.authtoken.serializers import AuthTokenSerializer


class AuthTokenByEmailSerializer(AuthTokenSerializer):
    """
    A little bit of cheating here.
    """
    email = serializers.EmailField()
    username = None

    def validate(self, attrs):
        email = attrs.get('email')
        if email:
            attrs['username'] = email
            return super().validate(attrs)
        else:
            raise serializers.ValidationError('Must include "email" and "password".')
