from rest_framework import routers

from instances.api.views import ImageViewSet, InstanceViewSet


router = routers.SimpleRouter()
router.register(r'api/instances', InstanceViewSet)
router.register(r'api/images', ImageViewSet)

urlpatterns = []
urlpatterns += router.urls
