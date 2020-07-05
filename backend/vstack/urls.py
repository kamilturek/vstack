from rest_framework.authtoken import views

from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', views.obtain_auth_token)
]
