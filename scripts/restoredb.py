#!/usr/bin/env python3
import argparse
import datetime
import os
from operator import itemgetter
from typing import Dict, List, NoReturn, Optional, Union

import docker
from azure.storage.blob import BlobClient, ContainerClient
from docker.models.containers import Container


CONTAINER = 'vstack_db_1'
POSTGRES_USER = os.environ.get('POSTGRES_USER')
POSTGRES_DB = os.environ.get('POSTGRES_DB')
STORAGE_CONN_STR = os.environ.get('STORAGE_CONN_STR')


def verify_args(args: argparse.Namespace) -> Optional[NoReturn]:
    required = ['container', 'user', 'dbname', 'conn_str']
    for arg in required:
        if getattr(args, arg) is None:
            raise KeyError(f'\'{arg}\' argument was not provided and environment variable was not set.')


def get_blobs(conn_str: str) -> List[Dict]:
    container = ContainerClient.from_connection_string(conn_str=conn_str, container_name='backup')
    return container.list_blobs()


def sort_by_modification_time(blobs: List[Dict]) -> List[Dict]:
    return sorted(blobs, key=itemgetter('last_modified'), reverse=True)


def get_latest_blob(conn_str: str) -> Dict:
    blobs = get_blobs(conn_str)
    return sort_by_modification_time(blobs)[0]


def get_blob_by_date(conn_str: str, date: datetime.date) -> Union[Dict, NoReturn]:
    blobs = get_blobs(conn_str)
    for blob in blobs:
        if blob['last_modified'].date() == date:
            return blob
    raise KeyError(f'The file dated {date} does not exist.')


def get_container(container_name: str) -> Container:
    client = docker.from_env()
    return client.containers.get(container_name)


def download(conn_str: str, blob_name: str) -> str:
    blob = BlobClient.from_connection_string(conn_str=conn_str, container_name='backup', blob_name=blob_name)
    filepath = f'/tmp/{blob_name}'
    with open(filepath, 'wb') as f:
        blob_data = blob.download_blob()
        blob_data.readinto(f)
    print(f'Downloaded {blob_name}.')
    return filepath


def restore(container: Container, user: str, dbname: str, filepath: str) -> Optional[NoReturn]:
    with open(filepath, 'rb') as f:
        data = f.read()
    container.put_archive(os.path.dirname(filepath), data)
    command = f'/bin/bash -c "pg_restore -U {user} -d {dbname}'
    exit_code, output = container.exec_run(f'{command} {filepath}"')
    if exit_code != 0:
        exit_code, output = container.exec_run(f'{command} --clean {filepath}"')
    if exit_code == 0:
        print(f'Restored {os.path.basename(filepath)}.')
    else:
        raise Exception(output)


def download_and_restore(args: argparse.Namespace) -> None:
    if args.date is None:
        blob = get_latest_blob(args.conn_str)
    else:
        blob = get_blob_by_date(args.conn_str, args.date)
    filepath = download(args.conn_str, blob['name'])
    container = get_container(args.container)
    restore(container, args.user, args.dbname, filepath)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Download database from storage and restore')
    parser.add_argument('-c', '--container', default=CONTAINER)
    parser.add_argument('-u', '--user', default=POSTGRES_USER)
    parser.add_argument('-d', '--dbname', default=POSTGRES_DB)
    parser.add_argument('-s', '--conn-str', default=STORAGE_CONN_STR)
    parser.add_argument('-t', '--date',
                        type=datetime.date.fromisoformat,
                        help='Format: YYYY-MM-DD Latest backup is selected if no date provided.')
    args = parser.parse_args()

    verify_args(args)
    download_and_restore(args)
