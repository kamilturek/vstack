from unittest import mock

from django.test import TestCase

from instances.models import Image, Instance


class InstanceSignalsTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.image = Image.objects.create(
            name='name',
            tag='tag',
            image_url='url'
        )

    @mock.patch.object(Instance, 'remove')
    def test_remove_on_delete(self, mock_remove):
        instance = Instance.objects.create(
            name='name',
            image=self.image,
            container_id='id'
        )
        instance.delete()
        mock_remove.assert_called_once()
