from utils.api import AuthAPITestCase


class SetPasswordAPITestCase(AuthAPITestCase):
    URL = '/api/users/{}/set_password/'

    def test_set_password(self):
        response = self.client.post(
            self.URL.format(self.user.id),
            {
                'current_password': 'pwd',
                'password': 'new_pwd',
                'password_confirmation': 'new_pwd'
            }
        )

        self.user.refresh_from_db()
        self.assertEqual(200, response.status_code)
        self.assertTrue(self.user.check_password('new_pwd'))

    def test_validate_current_password(self):
        response = self.client.post(
            self.URL.format(self.user.id),
            {
                'current_password': 'wrong_pwd',
                'password': 'new_pwd',
                'password_confirmation': 'new_pwd'
            }
        )

        self.user.refresh_from_db()
        self.assertEqual(400, response.status_code)
        self.assertFalse(self.user.check_password('new_pwd'))

    def test_validate_password_confirmation(self):
        response = self.client.post(
            self.URL.format(self.user.id),
            {
                'current_password': 'pwd',
                'password': 'new_pwd',
                'password_confirmation': 'other_pwd'
            }
        )

        self.user.refresh_from_db()
        self.assertEqual(400, response.status_code)
        self.assertFalse(self.user.check_password('new_pwd'))
