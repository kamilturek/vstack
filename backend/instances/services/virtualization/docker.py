import docker
from docker.models.containers import Container

from django.conf import settings

from instances.services.virtualization.base import Virtualization, VM


class DockerVM(VM):

    def __init__(self, container: Container) -> None:
        self.container = container

    @property
    def id(self) -> str:
        return self.container.short_id

    @property
    def status(self) -> str:
        return self.container.status

    def remove(self) -> None:
        self.container.remove(force=True)

    def stop(self) -> None:
        self.container.stop()

    def start(self) -> None:
        self.container.start()

    def restart(self) -> None:
        self.container.restart()


class DockerVirtualization(Virtualization):

    @classmethod
    def get_vm(self, id: str) -> DockerVM:
        client = docker.from_env()
        container = client.containers.get(id)
        return DockerVM(container)

    @classmethod
    def run_vm(self, name: str, image: str) -> DockerVM:
        client = docker.from_env()
        container = client.containers.run(
            name=name,
            image=image,
            command='bash',
            detach=True,
            tty=True,
        )
        return DockerVM(container)
