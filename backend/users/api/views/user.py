from typing import NoReturn, Union

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import NotAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from django.contrib.auth.models import User

from users.api.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['get'])
    def current(self, request: Request) -> Union[NoReturn, Response]:
        if request.user.is_authenticated:
            return Response(self.get_serializer(request.user).data)
        raise NotAuthenticated
