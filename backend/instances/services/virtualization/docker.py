import docker
from docker.models import containers, volumes

from instances.services.virtualization.base import Virtualization, VM, Volume


class DockerVM(VM):

    def __init__(self, container: containers.Container) -> None:
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


class DockerVolume(Volume):

    def __init__(self, volume: volumes.Volume) -> None:
        self.volume = volume

    def remove(self) -> None:
        return self.volume.remove()


class DockerVirtualization(Virtualization):

    @classmethod
    def get_vm(cls, id: str) -> DockerVM:
        client = docker.from_env()
        container = client.containers.get(id)
        return DockerVM(container)

    @classmethod
    def get_volume(cls, name: str) -> DockerVolume:
        client = docker.from_env()
        volume = client.volumes.get(name)
        return DockerVolume(volume)

    @classmethod
    def run_vm(cls, name: str, image: str) -> DockerVM:
        client = docker.from_env()
        container = client.containers.run(
            name=name,
            image=image,
            command='bash',
            detach=True,
            tty=True,
            stdin_open=True
        )
        return DockerVM(container)

    @classmethod
    def create_volume(cls, name: str) -> DockerVolume:
        client = docker.from_env()
        volume = client.volumes.create(
            name=name
        )
        return DockerVolume(volume)
