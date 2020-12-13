from rest_framework import routers

from instances.api.views import ImageViewSet, InstanceViewSet, VolumeViewSet


router = routers.SimpleRouter()
router.register(r'api/instances', InstanceViewSet, basename='instances')
router.register(r'api/images', ImageViewSet, basename='images')
router.register(r'api/volumes', VolumeViewSet, basename='volumes')

urlpatterns = []
urlpatterns += router.urls
