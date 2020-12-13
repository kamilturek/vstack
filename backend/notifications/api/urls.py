from rest_framework import routers

from notifications.api.views import NotificationViewSet

router = routers.SimpleRouter()
router.register(r'api/notifications', NotificationViewSet)

urlpatterns = []
urlpatterns += router.urls
