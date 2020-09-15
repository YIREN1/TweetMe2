from django.conf import settings
from rest_framework import serializers
from .models import Tweet

MAX_TWEET_LENGTH = settings.MAX_TWEET_LENGTH

class TweetCreateSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Tweet
        fields = ['user', 'id', 'content', 'likes', 'timestamp']
    
    def get_likes(self, obj):
        return obj.likes.count()
    
    def validate_content(self, value):
        if len(value) > MAX_TWEET_LENGTH:
            raise serializers.ValidationError("This tweet is too long")
        return value

class TweetSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Tweet
        fields = [
                'user', 
                'id', 
                'content',
                'likes',
                'is_retweet',
                'parent',
                'timestamp']

    def get_likes(self, obj):
        return obj.likes.count()