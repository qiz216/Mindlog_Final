from rest_framework import serializers
from messenger.models import *
from users.models import *

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'owner', 'name', 'message', 'created_at', 'sentiment', 
        'tag', 'location', 'event','time_start' ,'time_end')
        read_only_fields = ['id', 'created_at']

    def create(self, validated_data):
        if 'name' not in validated_data:
            validated_data['name'] = ''
        wit = wit_analysis(validated_data['name'], validated_data['message'])
        wit_attr = wit.get_attributes()
        for field in ['tag', 'sentiment', 'location', 'time_start', 'time_end', 'event']:
            validated_data[field] = wit_attr[field]
        return Message.objects.create(**validated_data)


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'gender', 'birthday', 'phone', 'state', 'city', 
        'photo', 'email', 'favorite_artist', 'favorite_song', 'favorite_show',
        'favorite_movie','favorite_color', 'sender')
        read_only_fields = ['id']
