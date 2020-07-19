from rest_framework import routers

from users.api.views import UserViewSet

router = routers.SimpleRouter()

router.register(r'', UserViewSet)

urlpatterns = [
]

urlpatterns += router.urls
