from rest_framework import serializers

from django.apps import apps


class NotificationSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        """
        Necessary dynamic model initialization due to circular import
        """
        super().__init__(*args, **kwargs)
        self.Meta.model = apps.get_model('notifications', 'Notification')

    actor = serializers.IntegerField(source='actor_id')

    class Meta:

        fields = ['id', 'actor', 'created', 'content', 'type', 'read']
