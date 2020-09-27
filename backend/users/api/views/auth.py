from rest_framework.authtoken.views import ObtainAuthToken

from users.api.serializers import AuthTokenByEmailSerializer


class ObtainAuthTokenByEmail(ObtainAuthToken):
    serializer_class = AuthTokenByEmailSerializer
