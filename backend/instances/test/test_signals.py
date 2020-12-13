from unittest import mock

from django.test import TestCase

from instances.models import Image, Instance, Volume


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


class VolumeSignalsTestCase(TestCase):

    @mock.patch.object(Volume, 'remove')
    def test_remove_on_delete(self, mock_remove):
        volume = Volume.objects.create(
            name='name',
            vol_id='id'
        )
        volume.delete()
        mock_remove.assert_called_once()
