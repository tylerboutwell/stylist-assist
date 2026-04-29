from django.contrib.auth.models import User
from rest_framework import serializers
from bookings.models import Booking, Client, Service

class BookingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"
        read_only_fields = ["stylist", "created_at", "updated_at"]

class ClientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"
        read_only_fields = ["stylist"]

class ServiceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"
        read_only_fields = ["stylist"]