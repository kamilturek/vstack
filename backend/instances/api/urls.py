from rest_framework import routers

from instances.api.views import ImageViewSet, InstanceViewSet


router = routers.SimpleRouter()
router.register(r'', InstanceViewSet)
router.register(r'images', ImageViewSet)

urlpatterns = []
urlpatterns += router.urls
