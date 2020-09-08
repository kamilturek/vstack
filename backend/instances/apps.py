from django.apps import AppConfig


class InstancesConfig(AppConfig):
    name = 'instances'

    def ready(self):
        import instances.signals
