from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
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

    def validate_password(self, value):
        # Build a temporary, unsaved User so validators that compare the
        # password against user attributes (e.g. UserAttributeSimilarityValidator,
        # which rejects a password too similar to the username or email)
        # have something real to check against — at this point in the flow
        # no User row exists yet.
        temp_user = User(
            username=self.initial_data.get("username", ""),
            email=self.initial_data.get("email", ""),
        )
        try:
            validate_password(value, user=temp_user)
        except DjangoValidationError as e:
            raise serializers.ValidationError(list(e.messages))
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user

ALLOWED_IMAGE_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp", "image/mpo"}
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
                "Unsupported file type. Please upload a JPEG, PNG, MPO, or WEBP image."
            )
        if image.size > MAX_IMAGE_SIZE_BYTES:
            raise serializers.ValidationError(
                f"Image too large. Max size is {MAX_IMAGE_SIZE_BYTES // (1024 * 1024)}MB."
            )
        return image