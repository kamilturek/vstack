from rest_framework.test import APITestCase

from django.contrib.auth.models import User


class CurrentUserAPITestCase(APITestCase):
    URL = '/api/users/current/'

    def test_get_current_logged_user(self):
        user = User.objects.create_user(
            username='user',
            password='pwd'
        )
        self.client.force_authenticate(user=user)
        response = self.client.get(self.URL)
        expected_response = {
            'username': 'user',
            'avatar': 'media/avatars/no_avatar.png',
        }
        self.assertEqual(200, response.status_code)
        self.assertEqual(expected_response, response.data)

    def test_get_current_not_logged_user(self):
        response = self.client.get(self.URL)
        self.assertEqual(401, response.status_code)
