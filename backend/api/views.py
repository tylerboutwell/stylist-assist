from django.contrib.auth.models import User
from rest_framework import permissions, viewsets, response, status
from rest_framework.decorators import action
from rest_framework.views import APIView

from .models import Post
from .serializers import UserSerializer, PostSerializer, RegisterSerializer
from openai import OpenAI
from django.conf import settings
client = OpenAI(api_key=settings.OPENAI_API_KEY)
import base64


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = User.objects.filter(id=self.request.user.id)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        serializer = UserSerializer(request.user, context={'request': request})
        return response.Response(serializer.data)

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return response.Response(
                {"message": "User created successfully"},
                status=status.HTTP_201_CREATED
            )

        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
        base_instructions = """
            You are an expert social media manager for luxury hair salons.
            
            Your goal is to create Instagram and TikTok captions that feel authentic, stylish, and written by a real person.
            
            Requirements:
            - Begin with a short, attention-grabbing hook.
            - Describe only what is confidently visible in the image.
            - Highlight the hairstyle, color, texture, shine, dimension, curls, layers, or finish when appropriate.
            - Use a warm, confident, modern tone.
            - End with a natural CTA such as "Book through the link in bio." or "DM to schedule your consultation."
            - Include EXACTLY 3 relevant hashtags.
            - Use 2–3 beauty-related emojis naturally.
            - Keep the caption between 60 and 120 words.
            
            Important:
            - Every caption should feel unique.
            - Vary sentence structure and vocabulary.
            - Avoid repetitive openings such as:
              - "Obsessed!"
              - "Another gorgeous..."
              - "Fresh..."
              - "Nothing beats..."
            - Never invent details that aren't visible in the image.
            """

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
                    "text": f"The stylist provided these additional instructions:\n{prompt}"
                },
            )

        response = client.responses.create(
            model="gpt-5.4-mini",
            input=[
                {
                    "role": "system",
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