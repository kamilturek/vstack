from django.db import IntegrityError
from django.test import TestCase

from instances.models import Volume


class VolumeModelTestCase(TestCase):

    def test_unique_name(self):
        Volume.objects.create(name='name')
        with self.assertRaises(IntegrityError):
            Volume.objects.create(name='name')
