import os
from typing import Dict, Iterator

from azure.storage.blob import BlobClient, ContainerClient


class Storage:

    def __init__(self, conn_str: str, container_name: str) -> None:
        """
        conn_str: Azure Storage connection string
        container_name: Azure Stoarge blob container name
        """
        self.conn_str = conn_str
        self.container_name = container_name

    def blob_client(self, blob_name: str) -> BlobClient:
        return BlobClient.from_connection_string(
            conn_str=self.conn_str,
            container_name=self.container_name,
            blob_name=blob_name
        )

    def container_client(self) -> ContainerClient:
        return ContainerClient.from_connection_string(
            conn_str=self.conn_str,
            container_name=self.container_name
        )

    def upload(self, file_path: str) -> None:
        file_name = os.path.basename(file_path)
        blob_client = self.blob_client(file_name)
        with open(file_path, 'rb') as f:
            blob_client.upload_blob(f)

    def download(self, blob_name: str, file_path: str) -> None:
        blob_client = self.blob_client(blob_name)
        with open(file_path, 'wb') as f:
            blob_data = blob_client.download_blob()
            blob_data.readinto(f)

    def list(self) -> Iterator[Dict]:
        return self.container_client().list_blobs()
