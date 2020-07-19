from rest_framework.authtoken import views

from django.contrib import admin
from django.urls import path, include

from users.api.urls import urlpatterns as users_urlpatterns

urlpatterns = [
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
    path('api/auth/', views.obtain_auth_token),
    path('api/users/', include(users_urlpatterns))
]
