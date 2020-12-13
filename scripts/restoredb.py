#!/usr/bin/env python3
import argparse
import datetime
import os
from operator import itemgetter
from typing import Dict, Iterable, NoReturn, Optional, Union

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


def get_latest_blob(blobs: Iterable[Dict]) -> Dict:
    return sorted(blobs, key=itemgetter('creation_time'), reverse=True)[0]


def get_blob_by_date(blobs: Iterable[Dict], date: datetime.date) -> Union[Dict, NoReturn]:
    for blob in blobs:
        if blob['creation_time'].date() == date:
            return blob
    raise KeyError(f'The file dated {date} does not exist.')


def get_blob(conn_str: str, date: Optional[datetime.date]) -> Dict:
    blobs = Storage(args.conn_str, 'backup').list()
    if date is not None:
        return get_blob_by_date(blobs, date)
    return get_latest_blob(blobs)


def download(conn_str: str, blob_name: str, file_path: str) -> None:
    Storage(conn_str, 'backup').download(blob_name, file_path)
    print(f'Downloaded {blob_name}.')


def restore(container_name: str, user: str, db_name: str, file_path: str) -> Optional[NoReturn]:
    file_name = os.path.basename(file_path)
    Database(container_name, user, db_name).restore(file_path)
    print(f'Restored {file_name}.')


def download_and_restore(args: argparse.Namespace) -> None:
    blob = get_blob(args.conn_str, args.date)
    file_path = f'/tmp/{blob["name"]}'
    download(args.conn_str, blob['name'], file_path)
    restore(args.container, args.user, args.dbname, file_path)
    os.remove(file_path)


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
