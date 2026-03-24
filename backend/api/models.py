from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    image = models.ImageField(upload_to="posts/")

    caption = models.TextField(blank=True)  # AI-generated caption
    hashtags = models.TextField(blank=True)  # AI-generated hashtags

    created_at = models.DateTimeField(auto_now_add=True)