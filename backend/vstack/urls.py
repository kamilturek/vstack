from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from instances.api.urls import urlpatterns as instances_urlpatterns
from notifications.api.urls import urlpatterns as notifications_urlpatterns
from users.api.urls import urlpatterns as users_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include(users_urlpatterns)),
    path('api-auth/', include('rest_framework.urls')),
]

urlpatterns += instances_urlpatterns
urlpatterns += notifications_urlpatterns
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
