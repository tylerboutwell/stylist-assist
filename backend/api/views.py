from django.contrib.auth.models import User
from rest_framework import permissions, viewsets, response
from rest_framework.decorators import action

from .models import Post
from .serializers import UserSerializer, PostSerializer
from openai import OpenAI
from django.conf import settings
client = OpenAI(api_key=settings.OPENAI_API_KEY)
import base64


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer()
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        serializer = UserSerializer(request.user, context={'request': request})
        return response.Response(serializer.data)

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]


    def perform_create(self, serializer):
        user = self.request.user
        image = self.request.FILES.get("image")
        content_type = image.content_type  # e.g. "image/png", "image/jpeg"
        image_bytes = image.read()
        encoded_image = base64.b64encode(image_bytes).decode("utf-8")

        response = client.responses.create(
            model="gpt-4.1-mini",
            input=[
                {
                    "role": "user",
                    "content": [
                        {"type": "input_text", "text": "Generate a social media caption and hashtags for this image."},
                        {
                            "type": "input_image",
                            "image_url": f"data:{content_type};base64,{encoded_image}",
                        },
                    ],
                }
            ],
        )

        text = response.output_text

        hashtags = "#example #tags"

        serializer.save(
            user=user,
            caption=text,
            hashtags=hashtags
        )