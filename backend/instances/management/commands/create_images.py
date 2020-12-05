from typing import List, TypedDict

from django.core.management.base import BaseCommand

from instances.models import Image


class Distribution(TypedDict):
    name: str
    image_url: str
    tags: List[str]


IMAGES: List[Distribution] = [
    {
        'name': 'ubuntu',
        'image_url': 'https://d1q6f0aelx0por.cloudfront.net/product-logos/library-ubuntu-logo.png',
        'tags': ['latest', '20.10', '20.04', '18.04', '16.04', '14.04'],
    },
    {
        'name': 'debian',
        'image_url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Openlogo-debianV2.svg/827px-Openlogo-debianV2.svg.png',  # noqa
        'tags': ['latest', 'bullseye', 'buster', 'jessie', 'stretch'],
    },
    {
        'name': 'alpine',
        'image_url': 'https://d1q6f0aelx0por.cloudfront.net/product-logos/library-alpine-logo.png',
        'tags': ['latest', '3.12', '3.11', '3.10', '3.9'],
    },
    {
        'name': 'fedora',
        'image_url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Fedora_logo.svg/1200px-Fedora_logo.svg.png',  # noqa
        'tags': ['latest', '34', '33', '32', '31'],
    },
    {
        'name': 'centos',
        'image_url': 'https://seeklogo.com/images/C/centos-logo-494F57D973-seeklogo.com.png',
        'tags': ['latest', '8', '7', '6']
    },
    {
        'name': 'archlinux',
        'image_url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Archlinux-icon-crystal-64.svg/1200px-Archlinux-icon-crystal-64.svg.png',  # noqa
        'tags': ['latest', 'base'],
    },
    {
        'name': 'amazonlinux',
        'image_url': 'https://raw.githubusercontent.com/docker-library/docs/9ca9202567ccc25ce110f98bbeb6c929844e05d0/amazonlinux/logo.png',  # noqa
        'tags': ['latest', '2', '1'],
    },
    {
        'name': 'oraclelinux',
        'image_url': 'https://d1q6f0aelx0por.cloudfront.net/product-logos/library-oraclelinux-logo.png',
        'tags': ['8', '7', '6'],
    }
]


class Command(BaseCommand):
    help = 'Fills database with sample images'

    def handle(self, *args, **kwargs):
        for image in IMAGES:
            for tag in image['tags']:
                Image.objects.get_or_create(
                    name=image['name'],
                    image_url=image['image_url'],
                    tag=tag,
                )
                self.stdout.write(f'Created {image["name"]}:{tag} image.')
