from django.contrib.auth.models import User
from rest_framework import serializers
from bookings.models import Booking, Client, Service

class BookingSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='client', read_only=True)
    service_name = serializers.CharField(source='service', read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'stylist', 'client', 'client_name', 'service', 'service_name', 'booked_price', 'start_time', 'end_time', 'status', 'notes',
                  'created_at', 'updated_at']
        read_only_fields = ["stylist", "created_at", "updated_at"]

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'first_name', 'last_name', 'email', 'phone_number', 'general_notes', 'stylist']
        read_only_fields = ["stylist"]

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'base_price', 'duration', 'stylist']
        read_only_fields = ["stylist"]