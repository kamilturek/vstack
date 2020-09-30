import functools

from django.conf import settings


class Asyncable:

    def __init__(self, fn):
        self.fn = fn

    def __get__(self, obj, type=None):
        return functools.partial(self, obj)

    def __call__(self, *args, **kwargs):
        if self.celery_enabled:
            return self.fn.delay(*args, **kwargs)
        return self.fn(*args, **kwargs)

    @property
    def celery_enabled(self):
        return settings.CELERY_ENABLED


asyncable = Asyncable
