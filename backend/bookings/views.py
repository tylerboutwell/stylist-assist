from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from bookings.models import Booking, Client, Service
from bookings.serializers import BookingSerializer, ClientSerializer, ServiceSerializer


class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(stylist=self.request.user)

    def perform_create(self, serializer):
        serializer.save(stylist=self.request.user)

class ClientViewSet(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Client.objects.filter(stylist=self.request.user)

    def perform_create(self, serializer):
        serializer.save(stylist=self.request.user)

class ServiceViewSet(viewsets.ModelViewSet):
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Service.objects.filter(stylist=self.request.user)

    def perform_create(self, serializer):
        serializer.save(stylist=self.request.user)