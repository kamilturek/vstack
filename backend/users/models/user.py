from django.contrib.auth.models import AbstractUser
from django.db import models

from users.managers import UserManager


class User(AbstractUser):
    username = None
    email = models.EmailField(
        'Email Address',
        unique=True
    )
    avatar = models.ImageField(
        upload_to='avatars',
        default='avatars/no_avatar.png'
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()
