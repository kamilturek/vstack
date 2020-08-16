from rest_framework.test import APITestCase

from django.contrib.auth.models import User


class AuthAPITestCase(APITestCase):

    def setUp(self):
        super().setUp()
        self.user = User.objects.create_user(
            username='user',
            password='pwd'
        )
        self.client.force_authenticate(user=self.user)
