from django.db import models
import random
from django.conf import settings
from django.db.models import Q

User = settings.AUTH_USER_MODEL
# Create your models here.


class Tweet(models.Model):
    # Maps to SQL data
    # id = models.AutoField(primary_key=True)
    # parent = models.ForeignKey("self", null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="tweets"
    )  # many users can many tweets
    # likes = models.ManyToManyField(User, related_name='tweet_user', blank=True, through=TweetLike)
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)


    class Meta:
        ordering = ["-id"]

    def serialize(self):
        """
        Feel free to delete!
        """
        return {"id": self.id, "content": self.content, "likes": random.randint(0, 200)}
