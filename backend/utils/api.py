from rest_framework.test import APITestCase

from users.models import User


class AuthAPITestCase(APITestCase):

    def setUp(self):
        super().setUp()
        self.user = User.objects.create_user(
            email='user@user.com',
            password='pwd'
        )
        self.client.force_authenticate(user=self.user)
