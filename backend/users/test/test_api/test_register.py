from rest_framework.test import APITestCase

from users.models import User


class RegisterUserAPITestCase(APITestCase):
    URL = '/api/users/'

    def test_register(self):
        response = self.client.post(
            self.URL,
            {
                'email': 'user@user.com',
                'password': 'pwd',
            }
        )
        self.assertEqual(201, response.status_code)

    def test_register_existing_user(self):
        User.objects.create_user(
            email='user@user.com',
            password='pwd'
        )
        response = self.client.post(
            self.URL,
            {
                'email': 'user@user.com',
                'password': 'pwd',
            }
        )
        self.assertEqual(400, response.status_code)
