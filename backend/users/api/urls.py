from rest_framework import routers
from rest_framework.urlpatterns import path

from users.api.views import ObtainAuthTokenByEmail, UserViewSet


router = routers.SimpleRouter()
router.register(r'', UserViewSet)

urlpatterns = [
    path('login/', ObtainAuthTokenByEmail.as_view())
]
urlpatterns += router.urls
