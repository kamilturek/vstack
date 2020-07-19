from rest_framework.authtoken import views

from django.contrib import admin
from django.urls import path, include

from users.api.urls import urlpatterns as users_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', views.obtain_auth_token),
    path('api/users/', include(users_urlpatterns))
]
