from rest_framework import serializers


class NotificationSerializer(serializers.Serializer):
    actor = serializers.IntegerField(source='actor_id')
    created = serializers.DateTimeField()
    content = serializers.CharField()
    type = serializers.CharField()
