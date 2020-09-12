from rest_framework.authtoken import views

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from instances.api.urls import urlpatterns as instances_urlpatterns
from users.api.urls import urlpatterns as users_urlpatterns


urlpatterns = [
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
    path('api/auth/', views.obtain_auth_token),
    path('api/users/', include(users_urlpatterns)),
]

urlpatterns += instances_urlpatterns
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
