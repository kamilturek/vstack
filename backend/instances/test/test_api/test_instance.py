from unittest import mock

from instances.models import Image, Instance, Volume
from utils.api import AuthAPITestCase


@mock.patch.object(Instance, 'run')
@mock.patch.object(Instance, 'status', new_callable=mock.PropertyMock, return_value='running')
class InstanceAPITestCase(AuthAPITestCase):
    URL = '/api/instances/'

    @classmethod
    def setUpTestData(cls):
        cls.image = Image.objects.create(
            name='ubuntu',
            tag='18.04',
            image_url='image.png'
        )

    def test_retrieve(self, mock_status, mock_run):
        instance = Instance.objects.create(
            name='production',
            image=self.image
        )
        instance.grant_access(self.user)
        response = self.client.get(f'{self.URL}{instance.id}/')
        expected_response = {
            'id': instance.id,
            'name': instance.name,
            'container_id': instance.container_id,
            'status': 'running',
            'image': {
                'id': self.image.id,
                'name': self.image.name,
                'tag': self.image.tag,
                'image_url': self.image.image_url,
            },
            'volumes': [],
        }
        self.assertEqual(200, response.status_code)
        self.assertEqual(expected_response, response.data)

    def test_retrieve_with_volumes(self, mock_status, mock_run):
        instance = Instance.objects.create(
            name='production',
            image=self.image
        )
        volume = Volume.objects.create(
            name='volume'
        )
        instance.volumes.add(volume)
        instance.grant_access(self.user)
        response = self.client.get(f'{self.URL}{instance.id}/')
        expected_response = {
            'id': instance.id,
            'name': instance.name,
            'container_id': instance.container_id,
            'status': 'running',
            'image': {
                'id': self.image.id,
                'name': self.image.name,
                'tag': self.image.tag,
                'image_url': self.image.image_url,
            },
            'volumes': [volume.name],
        }
        self.assertEqual(200, response.status_code)
        self.assertEqual(expected_response, response.data)

    def test_list(self, mock_status, mock_run):
        instance = Instance.objects.create(
            name='production',
            image=self.image
        )
        instance.grant_access(self.user)
        response = self.client.get(self.URL)
        expected_response = [
            {
                'id': instance.id,
                'name': instance.name,
                'container_id': instance.container_id,
                'status': 'running',
                'image': {
                    'id': self.image.id,
                    'name': self.image.name,
                    'tag': self.image.tag,
                    'image_url': self.image.image_url,
                },
                'volumes': [],
            }
        ]
        self.assertEqual(200, response.status_code)
        self.assertEqual(expected_response, response.data)

    def test_create(self, mock_status, mock_run):
        response = self.client.post(
            self.URL,
            {
                'name': 'new instance',
                'image': self.image.id,
                'volumes': [],
            }
        )
        instance = Instance.objects.first()
        expected_response = {
            'id': instance.id,
            'name': instance.name,
            'container_id': instance.container_id,
            'image': self.image.id,
            'volumes': [],
        }
        mock_run.assert_called_once()
        self.assertEqual(201, response.status_code)
        self.assertEqual(expected_response, response.data)

    def test_create_with_volumes(self, mock_status, mock_run):
        volume = Volume.objects.create(
            name='volume'
        )
        response = self.client.post(
            self.URL,
            {
                'name': 'new instance',
                'image': self.image.id,
                'volumes': [volume.id],
            }
        )
        instance = Instance.objects.first()
        expected_response = {
            'id': instance.id,
            'name': instance.name,
            'container_id': instance.container_id,
            'image': self.image.id,
            'volumes': [volume.id],
        }
        mock_run.assert_called_once()
        self.assertEqual(201, response.status_code)
        self.assertEqual(expected_response, response.data)
