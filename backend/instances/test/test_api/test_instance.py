from unittest import mock

from instances.models import Image, Instance
from utils.api import AuthAPITestCase


class InstanceAPITestCase(AuthAPITestCase):
    URL = '/api/instances/'

    @classmethod
    def setUpTestData(cls):
        cls.image = Image.objects.create(
            name='ubuntu',
            tag='18.04',
            image_url='image.png'
        )

    @mock.patch.object(Instance, 'run')
    @mock.patch.object(Instance, 'status', new_callable=mock.PropertyMock, return_value='running')
    def test_retrieve(self, mock_status, mock_run):
        instance = Instance.objects.create(
            name='production',
            image=self.image
        )
        response = self.client.get(f'{self.URL}{instance.id}/')
        expected_response = {
            'id': instance.id,
            'name': instance.name,
            'container_id': instance.container_id,
            'status': 'running',
            'image': {
                'name': self.image.name,
                'tag': self.image.tag,
                'image_url': self.image.image_url,
            },
        }
        self.assertEqual(200, response.status_code)
        self.assertEqual(expected_response, response.data)

    @mock.patch.object(Instance, 'run')
    @mock.patch.object(Instance, 'status', new_callable=mock.PropertyMock, return_value='running')
    def test_list(self, mock_status, mock_run):
        instance = Instance.objects.create(
            name='production',
            image=self.image
        )
        response = self.client.get(self.URL)
        expected_response = [
            {
                'id': instance.id,
                'name': instance.name,
                'container_id': instance.container_id,
                'status': 'running',
                'image': {
                    'name': self.image.name,
                    'tag': self.image.tag,
                    'image_url': self.image.image_url,
                },
            }
        ]
        self.assertEqual(200, response.status_code)
        self.assertEqual(expected_response, response.data)

    @mock.patch.object(Instance, 'run')
    @mock.patch.object(Instance, 'status', new_callable=mock.PropertyMock, return_value='running')
    def test_create(self, mock_status, mock_run):
        response = self.client.post(
            self.URL, 
            {
                'name': 'new instance',
                'image': self.image.id,
            }
        )
        instance = Instance.objects.first()
        expected_response = {
            'id': instance.id,
            'name': 'new instance',
            'container_id': instance.container_id,
            'image': self.image.id,
        }
        self.assertEqual(201, response.status_code)
        self.assertEqual(expected_response, response.data)
