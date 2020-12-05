from unittest import mock

from instances.models import Volume
from utils.api import AuthAPITestCase


class VolumeAPITestCase(AuthAPITestCase):
    URL = '/api/volumes/'

    def test_retrieve(self):
        volume = Volume.objects.create(name='name')
        volume.grant_access(self.user)
        response = self.client.get(f'{self.URL}{volume.id}/')
        expected_response = {
            'id': volume.id,
            'name': volume.name,
        }
        self.assertEqual(200, response.status_code)
        self.assertEqual(expected_response, response.data)

    @mock.patch.object(Volume, 'create')
    def test_create(self, mock_create):
        response = self.client.post(
            self.URL,
            {
                'name': 'new volume'
            }
        )
        volume = Volume.objects.first()
        expected_response = {
            'id': volume.id,
            'name': 'new volume',
        }
        mock_create.assert_called_once()
        self.assertEqual(201, response.status_code)
        self.assertEqual(expected_response, response.data)

    @mock.patch.object(Volume, 'create')
    def test_create_duplicate(self, mock_create):
        Volume.objects.create(name='new volume')
        response = self.client.post(
            self.URL,
            {
                'name': 'new volume'
            }
        )
        self.assertEqual(400, response.status_code)
        self.assertEqual('unique', response.data['name'][0].code)
