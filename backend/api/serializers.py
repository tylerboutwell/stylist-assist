from django.contrib.auth.models import User
from rest_framework import serializers

from api.models import Post


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user

ALLOWED_IMAGE_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_IMAGE_SIZE_BYTES = 8 * 1024 * 1024  # 8MB

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"
        read_only_fields = ["user"]

    def validate_image(self, image):
        content_type = getattr(image, "content_type", None)
        if content_type not in ALLOWED_IMAGE_CONTENT_TYPES:
            raise serializers.ValidationError(
                "Unsupported file type. Please upload a JPEG, PNG, or WEBP image."
            )
        if image.size > MAX_IMAGE_SIZE_BYTES:
            raise serializers.ValidationError(
                f"Image too large. Max size is {MAX_IMAGE_SIZE_BYTES // (1024 * 1024)}MB."
            )
        return image