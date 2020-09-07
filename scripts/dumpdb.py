#!/usr/bin/env python3
import argparse
import os
import datetime
from typing import NoReturn, Optional

import docker
from docker.models.containers import Container
from azure.storage.blob import BlobClient


CONTAINER = 'vstack_db_1'
POSTGRES_USER = os.environ.get('POSTGRES_USER')
POSTGRES_DB = os.environ.get('POSTGRES_DB')
STORAGE_CONN_STR = os.environ.get('STORAGE_CONN_STR')


def verify_args(args: argparse.Namespace) -> Optional[NoReturn]:
    required = ['container', 'user', 'dbname', 'conn_str']
    for arg in required:
        if getattr(args, arg) is None:
            raise KeyError(f'\'{arg}\' argument was not provided and environment variable was not set.')


def get_container(container_name: str) -> Container:
    client = docker.from_env()
    return client.containers.get(container_name)


def get_filepath() -> str:
    suffix = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f'vstack_db_{suffix}.tar'
    filepath = f'/tmp/{filename}'
    return filepath


def dump(container: Container, user: str, dbname: str, filepath: str) -> Optional[NoReturn]:
    exit_code, output = container.exec_run(f'/bin/bash -c "pg_dump -U {user} -F t {dbname} > {filepath}"')
    if exit_code == 0:
        bits, stat = container.get_archive(filepath)
        with open(filepath, 'wb') as f:
            for chunk in bits:
                f.write(chunk)
        print(f'Dumped {os.path.basename(filepath)}.')
    else:
        raise Exception(output)


def upload(conn_str: str, filepath: str) -> None:
    filename = os.path.basename(filepath)
    blob = BlobClient.from_connection_string(conn_str=conn_str, container_name='backup', blob_name=filename)
    with open(filepath, 'rb') as f:
        blob.upload_blob(f)
    print(f'Uploaded {filename}.')


def dump_and_upload(args: argparse.Namespace) -> None:
    container = get_container(args.container)
    filepath = get_filepath()
    dump(container, args.user, args.dbname, filepath)
    upload(args.conn_str, filepath)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Dump database and upload to storage.')
    parser.add_argument('-c', '--container', default=CONTAINER)
    parser.add_argument('-u', '--user', default=POSTGRES_USER)
    parser.add_argument('-d', '--dbname', default=POSTGRES_DB)
    parser.add_argument('-s', '--conn-str', default=STORAGE_CONN_STR)
    args = parser.parse_args()

    verify_args(args)
    dump_and_upload(args)
