from abc import ABCMeta

from django.db import models


class ABCModelMeta(ABCMeta, models.base.ModelBase):
    ...


class ABCModel(models.Model):
    ___metaclass__ = ABCModelMeta

    class Meta:
        abstract = True
