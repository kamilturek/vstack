from utils.api.exporter import Exporter


class InstanceExporter(Exporter):
    filename = 'instances.csv'
    columns = ['ID', 'Name', 'Image', 'Volumes']
