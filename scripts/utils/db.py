import os

import docker
from docker.models.containers import Container


class Database:

    def __init__(self,
                 container_name: str,
                 user_name: str,
                 db_name: str) -> None:
        """
        container_name: Docker container name
        user_name: DB user name
        db_name: DB name
        """
        self.container_name = container_name
        self.user_name = user_name
        self.db_name = db_name

    def dump(self, file_path: str) -> None:
        container = self.container()
        tmp_path = f'/tmp/{os.path.basename(file_path)}'
        exit_code, output = container.exec_run(
            f'bash -c "pg_dump -U {self.user_name} -F t {self.db_name} > {tmp_path}"'
        )
        if exit_code == 0:
            bits, stat = container.get_archive(tmp_path)
            with open(file_path, 'wb') as f:
                for chunk in bits:
                    f.write(chunk)
        else:
            raise Exception(output)

    def restore(self, file_path: str) -> None:
        container = self.container()
        with open(file_path, 'rb') as f:
            data = f.read()
        container.put_archive('/tmp/', data)
        file_name = os.path.basename(file_path)
        container.exec_run(
            f'bash -c "pg_restore -U {self.user_name} -d {self.db_name} --clean --create /tmp/{file_name}"'
        )

    def container(self) -> Container:
        client = docker.from_env()
        return client.containers.get(self.container_name)
