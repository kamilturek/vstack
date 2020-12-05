from unittest import mock

from instances.models import Volume
from utils.api import AuthAPITestCase


class VolumeAPITestCase(AuthAPITestCase):
    URL = '/api/volumes/'


class VolumeListRetrieveAPITestCase(VolumeAPITestCase):

    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()
        cls.volume = Volume.objects.create(
            name='name',
            vol_id='vol_id'
        )

    def setUp(self):
        super().setUp()
        self.volume.grant_access(self.user)

    def test_retrieve(self):
        response = self.client.get(f'{self.URL}{self.volume.id}/')
        expected_response = {
            'id': self.volume.id,
            'name': self.volume.name,
            'vol_id': self.volume.vol_id,
        }
        self.assertEqual(200, response.status_code)
        self.assertEqual(expected_response, response.data)

    def test_list(self):
        response = self.client.get(self.URL)
        expected_response = [
            {
                'id': self.volume.id,
                'name': self.volume.name,
                'vol_id': self.volume.vol_id,
            }
        ]
        self.assertEqual(200, response.status_code)
        self.assertEqual(expected_response, response.data)


@mock.patch.object(Volume, 'create')
class VolumeCreateAPITestCase(VolumeAPITestCase):

    def test_create(self, mock_create):
        response = self.client.post(
            self.URL,
            {'name': 'new volume'}
        )
        volume = Volume.objects.get(
            name='new volume'
        )
        expected_response = {
            'id': volume.id,
            'name': 'new volume',
            'vol_id': None,
        }
        mock_create.assert_called_once()
        self.assertEqual(201, response.status_code)
        self.assertEqual(expected_response, response.data)

    def test_create_duplicate(self, mock_create):
        Volume.objects.create(
            name='new volume'
        )
        response = self.client.post(
            self.URL,
            {'name': 'new volume'}
        )
        mock_create.assert_not_called()
        self.assertEqual(400, response.status_code)
        self.assertEqual('unique', response.data['name'][0].code)
