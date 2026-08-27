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
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(stylist=self.request.user)

    def perform_create(self, serializer):
        user = self.request.user
        image = self.request.FILES.get("image")
        prompt = self.request.data.get("prompt")
        content_type = image.content_type  # e.g. "image/png", "image/jpeg"
        image_bytes = image.read()
        encoded_image = base64.b64encode(image_bytes).decode("utf-8")
        base_instructions = """
            You are an expert social media manager for luxury hair salons.
            
            Your goal is to write captions that sound like a real hairstylist talking to their clients online. Avoid influencer-style marketing language.
            Requirements:
            - Begin with a short, attention-grabbing hook.
            - Describe only what is confidently visible in the image.
            - Highlight the hairstyle, color, texture, shine, dimension, curls, layers, or finish when appropriate.
            - Use a warm, confident, modern tone.
            - End with a natural CTA such as "Book through the link in bio." or "DM to schedule your consultation."
            - Include EXACTLY 3 relevant hashtags.
            - Use 2–3 beauty-related emojis naturally.
            - Keep the caption between 35-90 words.
            
            Whenever appropriate, write from the stylist's perspective using "I" and "we."
            Examples:
            - "I added..."
            - "We focused on..."
            - "I finished with..."
            - "My favorite part was..."
            
            Important:
            - Write like a talented hairstylist posting their own work, not like a marketing agency.
            - Avoid generic luxury salon phrases.
            - Do not use phrases like:
              - "beautiful transformation"
              - "gorgeous dimension"
              - "full of bounce"
              - "stunning results"
              - "obsessed"
              - "sleek and polished"
              - "this look is everything"
            - Make captions conversational, specific, and personal.
            - Include personality when appropriate.
            - Not every caption needs to sound luxurious; some should feel casual, friendly, and authentic.
            - Imagine the stylist is posting this to their own Instagram followers.
            Avoid repetitive sentence structures like:
                - "It's the kind of..."
                - "The perfect..."
                - "Whether you're..."
                - "If you're looking for..."
            Most important:
                Write like a hairstylist quickly posting their favorite work on Instagram. Prioritize authenticity over sounding professional.
            """

        content_list = [
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
                    "content": [
                        {
                        'type': 'input_text',
                        'text': base_instructions
                        }
                    ]
                },
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