from rest_framework.test import APITestCase

from django.contrib.auth.models import User


class RegisterUserAPITestCase(APITestCase):
    URL = '/api/users/'

    def test_register(self):
        response = self.client.post(
            self.URL,
            {
                'username': 'user',
                'password': 'pwd',
            }
        )
        self.assertEqual(201, response.status_code)

    def test_register_existing_user(self):
        User.objects.create_user(
            username='user',
            password='pwd'
        )
        response = self.client.post(
            self.URL,
            {
                'username': 'user',
                'password': 'pwd',
            }
        )
        self.assertEqual(400, response.status_code)
