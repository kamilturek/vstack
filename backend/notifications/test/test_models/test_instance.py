from unittest import mock

from django.test import TestCase

from instances.models import Image, Instance
from notifications.models import InstanceScheduledNotification, Notification
from users.models import User


class InstanceNotificationTestCase(TestCase):

    def setUp(self):
        super().setUp()
        image = Image.objects.create(
            name='ubuntu',
            tag='18.04',
            image_url='image.png'
        )
        self.instance = Instance.objects.create(
            name='Test Instance',
            image=image
        )
        self.user = User.objects.create(email='user@user.com')

    @mock.patch.object(Notification, '_send_to_channel')
    def test_send(self, mock_send_channel):
        notification = InstanceScheduledNotification.send(
            recipent=self.user,
            actor=self.instance
        )
        mock_send_channel.assert_called_once()
        self.assertEqual(self.instance, notification.actor)
        self.assertEqual(self.user, notification.recipent)
        self.assertFalse(notification.read)
