from django.test import TestCase

from instances.models import Volume
from users.models import User


class VolumeManagerTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.volume = Volume.objects.create(name='name')

    def test_permitted(self):
        user = User.objects.create_user(
            email='user@user.com',
            password='pwd'
        )
        self.volume.grant_access(user)
        self.assertEqual(1, Volume.objects.permitted(user).count())

    def test_not_permitted(self):
        user = User.objects.create_user(
            email='user@user.com',
            password='pwd'
        )
        self.assertEqual(0, Volume.objects.permitted(user).count())
