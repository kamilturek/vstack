from rest_framework.test import APITestCase

from users.models import User


class LoginUserAPITestCase(APITestCase):
    URL = '/api/auth/'

    def test_login_existing_user(self):
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
        self.assertEqual(200, response.status_code)
        self.assertIn('token', response.data)

    def test_login_non_existent_user(self):
        response = self.client.post(
            self.URL,
            {
                'username': 'user',
                'password': 'pwd'
            }
        )
        self.assertEqual(400, response.status_code)
