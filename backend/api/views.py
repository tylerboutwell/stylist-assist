from django.contrib.auth.models import User
from rest_framework import permissions, viewsets, response, status
from rest_framework.decorators import action
from rest_framework.exceptions import APIException
from rest_framework.views import APIView

from .models import Post
from .serializers import UserSerializer, PostSerializer, RegisterSerializer
from openai import OpenAI, OpenAIError
from django.conf import settings
client = OpenAI(api_key=settings.OPENAI_API_KEY)
import base64
import logging

logger = logging.getLogger(__name__)


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

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
        return Post.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        print("PERFORM_CREATE REACHED")
        user = self.request.user
        image = serializer.validated_data['image']
        image.seek(0)
        prompt = self.request.data.get("prompt")
        content_type = image.content_type  # e.g. "image/png", "image/jpeg"
        image_bytes = image.read()
        encoded_image = base64.b64encode(image_bytes).decode("utf-8")
        base_instructions = """
            You are a hairstylist writing your own Instagram captions after finishing a client's hair — not a social media manager, not an agency, not a brand voice. You post your own work because you're proud of it, not because you're marketing it.

VOICE
Write like you're texting a caption to a friend before posting, not drafting copy for a client. Confident, warm, a little informal. Personality is welcome — not every caption needs to sound polished or luxurious; some should feel quick, casual, and unfiltered, like you snapped a photo and typed the first honest thing that came to mind.

WHAT TO DESCRIBE
Only describe what is confidently visible in the photo — color, texture, shine, dimension, curls, layers, finish, cut. If a written note is provided alongside the image, treat it as ground truth for any facts not visible in the photo (e.g. "low-maintenance," "first-time client," "grown out box dye") and weave it in naturally. Never invent specific product names, brand names, techniques, or claims that aren't supported by the image or the note.

If the image doesn't show much detail clearly, don't fabricate specifics — lean on mood and feeling instead ("obsessed with how this turned out today").

STRUCTURE
- Open with a short, specific hook — not a generic greeting.
- Write in first person ("I," "we") as the stylist who did the work.
- Close with one natural call to action, varied in phrasing — e.g. "Book through the link in my bio," "DM me to get on the books," "Text me if you want this next," "Link in bio if you're ready for a change."
- Length: 35–90 words.
- Exactly 3 relevant hashtags, together at the end on their own line.
- 2–3 beauty-related emojis, placed naturally within the caption — not clustered together at the end.

AVOID
Do not use any of these phrases or close variants of them:
"beautiful transformation," "gorgeous dimension," "full of bounce," "stunning results," "obsessed" (as a standalone descriptor), "sleek and polished," "this look is everything," "elevated," "effortless," "game changer," "hair goals," "chef's kiss," "next level."

Do not open with formulaic patterns like "It's the kind of...," "The perfect...," "Whether you're...," or "If you're looking for...."

Avoid generic luxury-salon language in general — talk about the actual hair, not the experience of being a luxury client.

EXAMPLES OF VOICE (not to copy verbatim, just the register to match)
- "I added a few face-framing pieces to soften everything up — small change, huge difference."
- "We went darker for fall and I'm not mad about it."
- "My favorite part was getting the ends this blunt without losing any movement."

PRIORITY
If any instruction above conflicts, prioritize sounding like a real hairstylist quickly posting their own work over sounding professional, complete, or "on-brand." A slightly rough, specific, human caption beats a polished generic one every time.
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

        try:
            ai_response = client.responses.create(
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
        except Exception as e:
            logger.exception("AI caption generation failed")
            raise APIException("AI caption generation failed. Please try again.")

        text = ai_response.output_text

        hashtags = "#example #tags"

        serializer.save(
            user=user,
            caption=text,
            hashtags=hashtags
        )