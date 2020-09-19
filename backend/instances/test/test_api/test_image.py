from instances.models import Image
from utils.api import AuthAPITestCase


class ImageAPITestCase(AuthAPITestCase):
    URL = '/api/images/'

    @classmethod
    def setUpTestData(cls):
        cls.image = Image.objects.create(
            name='ubuntu',
            tag='18.04',
            image_url='image.png'
        )

    def test_retrieve(self):
        response = self.client.get(f'{self.URL}{self.image.id}/')
        expected_response = {
            'name': 'ubuntu',
            'tag': '18.04',
            'image_url': 'image.png',
        }
        self.assertEqual(200, response.status_code)
        self.assertEqual(expected_response, response.data)

    def test_list(self):
        response = self.client.get(self.URL)
        expected_response = [
            {
                'name': 'ubuntu',
                'tag': '18.04',
                'image_url': 'image.png',
            }
        ]
        self.assertEqual(200, response.status_code)
        self.assertEqual(expected_response, response.data)
