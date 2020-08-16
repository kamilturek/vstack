from typing import Any, Dict, NoReturn, Union

from rest_framework import serializers


class PasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField()
    password = serializers.CharField()
    password_confirmation = serializers.CharField()

    def validate(self, data: Dict[str, Any]) -> Union[NoReturn, Dict[str, Any]]:
        if data['password'] != data['password_confirmation']:
            raise serializers.ValidationError('Provided password are not the same.')
        return data

    def validate_current_password(self, value: str) -> Union[NoReturn, str]:
        user = self.context['user']
        if not user.check_password(value):
            raise serializers.ValidationError('Wrong current password.')
        return value
