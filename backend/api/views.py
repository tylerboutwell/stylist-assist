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
        prompt = self.request.data.get("prompt")
        content_type = image.content_type  # e.g. "image/png", "image/jpeg"
        image_bytes = image.read()
        encoded_image = base64.b64encode(image_bytes).decode("utf-8")
        base_instructions = """You are an expert Social Media Manager for high-end hair salons. 
            Create an engaging, trendy Instagram/TikTok caption based on this image.
            
            Requirements:
            - Tone: Professional, upbeat, and stylish.
            - Structure: Start with a catchy 'hook' line, followed by a brief description of the work.
            - Call to Action: Include a natural suggestion to 'Book via link in bio' or 'DM for consultations'.
            - Hashtags: Include EXACTLY 3 highly relevant hashtags (e.g., #BalayageSpecialist). Do not exceed 3.
            - Emojis: Use 2-3 relevant hair/beauty emojis."""

        content_list = [
                    {"type": "input_text", "text": base_instructions},
                    {
                        "type": "input_image",
                        "image_url": f"data:{content_type};base64,{encoded_image}",
                    },
                ]

        if prompt:
            content_list.append(
                {
                    "type": "input_text",
                    "text": f"Additional user instructions: {self.request.data.get("prompt", "")}"
                },
            )

        response = client.responses.create(
            model="gpt-4.1-mini",
            input=[
                {
                    "role": "user",
                    "content": content_list
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