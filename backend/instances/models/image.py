from django.db import models


class Image(models.Model):
    name = models.TextField()
    tag = models.TextField()
    image_url = models.URLField()

    def __str__(self) -> str:
        return f'{self.name}:{self.tag}'.lower()
