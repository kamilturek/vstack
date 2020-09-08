from rest_framework import routers

from instances.api.views import ImageViewSet


router = routers.SimpleRouter()
router.register(r'images', ImageViewSet)

urlpatterns = []
urlpatterns += router.urls
