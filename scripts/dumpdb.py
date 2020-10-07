#!/usr/bin/env python3
import argparse
import os
import datetime
from typing import NoReturn, Optional

from utils import Database, Storage


CONTAINER = 'vstack_db_1'
POSTGRES_USER = os.environ.get('POSTGRES_USER')
POSTGRES_DB = os.environ.get('POSTGRES_DB')
STORAGE_CONN_STR = os.environ.get('STORAGE_CONN_STR')


def verify_args(args: argparse.Namespace) -> Optional[NoReturn]:
    required = ['container', 'user', 'dbname', 'conn_str']
    for arg in required:
        if getattr(args, arg) is None:
            raise KeyError(f'\'{arg}\' argument was not provided and environment variable was not set.')


def create_filepath() -> str:
    suffix = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f'vstack_db_{suffix}.tar'
    filepath = f'/tmp/{filename}'
    return filepath


def dump(container_name: str, user: str, db_name: str, file_path: str) -> None:
    file_name = os.path.basename(file_path)
    Database(container_name, user, db_name).dump(file_path)
    print(f'Dumped {file_name}.')


def upload(conn_str: str, file_path: str) -> None:
    file_name = os.path.basename(file_path)
    Storage(conn_str, 'backup').upload(file_path)
    print(f'Uploaded {file_name}.')


def dump_and_upload(args: argparse.Namespace) -> None:
    file_path = create_filepath()
    dump(args.container, args.user, args.dbname, file_path)
    upload(args.conn_str, file_path)
    os.remove(file_path)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Dump database and upload to storage.')
    parser.add_argument('-c', '--container', default=CONTAINER)
    parser.add_argument('-u', '--user', default=POSTGRES_USER)
    parser.add_argument('-d', '--dbname', default=POSTGRES_DB)
    parser.add_argument('-s', '--conn-str', default=STORAGE_CONN_STR)
    args = parser.parse_args()

    verify_args(args)
    dump_and_upload(args)
