from unittest import mock

from django.test import TestCase

from utils.decorators import asyncable


@mock.patch.object(asyncable, 'celery_enabled', new_callable=mock.PropertyMock)
class AsyncableTestCase(TestCase):

    def setUp(self):
        self.fn = mock.Mock()

    def test_celery_disabled(self, mock_asyncable):
        mock_asyncable.return_value = False
        asyncable_fn = asyncable(self.fn)
        asyncable_fn()
        self.fn.assert_called_once()
        self.fn.delay.assert_not_called()

    def test_celery_enabled(self, mock_asyncable):
        mock_asyncable.return_value = True
        asyncable_fn = asyncable(self.fn)
        asyncable_fn()
        self.fn.assert_not_called()
        self.fn.delay.assert_called_once()
