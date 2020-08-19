from typing import NoReturn, Union

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import NotAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from django.contrib.auth.models import User

from users.api.serializers import AvatarSerializer, PasswordSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['get'])
    def current(self, request: Request) -> Union[NoReturn, Response]:
        if request.user.is_authenticated:
            return Response(self.get_serializer(request.user).data)
        raise NotAuthenticated

    @action(detail=True, methods=['post'])
    def set_password(self, request: Request, pk: int) -> Union[NoReturn, Response]:
        user = self.get_object()
        serializer = PasswordSerializer(data=request.data, context={'user': user})
        if serializer.is_valid(raise_exception=True):
            user.set_password(serializer.data['password'])
            user.save()
            return Response('Password has been set.')

    @action(detail=True, methods=['post'])
    def set_avatar(self, request: Request, pk: int):
        serializer = AvatarSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = self.get_object()
            user.profile.avatar = request.data['avatar']
            user.profile.save()
            return Response('Avatar has been set.')
