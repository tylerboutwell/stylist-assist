from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.db import models

class Booking(models.Model):
    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        CONFIRMED = "CONFIRMED", "Confirmed"
        COMPLETED = "COMPLETED", "Completed"
        CANCELLED = "CANCELLED", "Cancelled"
        NO_SHOW = "NO_SHOW", "No Show"

    stylist = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    client = models.ForeignKey("Client", on_delete=models.CASCADE, related_name="bookings")
    service = models.ForeignKey("Service", on_delete=models.PROTECT, related_name="bookings")
    booked_price = models.DecimalField(max_digits=7, decimal_places=2)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    @property
    def calculated_duration(self):
        return self.end_time - self.start_time

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )

    notes = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        if self.start_time >= self.end_time:
            raise ValidationError("End time must be after start time.")

    def __str__(self):
        return f"{self.service.name} for {self.client} at {self.start_time}"

class Service(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    base_price = models.DecimalField(max_digits=7, decimal_places=2)
    duration = models.DurationField(help_text="Expected time for this service")
    stylist = models.ForeignKey(User, on_delete=models.CASCADE, related_name="services")

    def __str__(self):
        return f"{self.name} (${self.base_price})"

class Client(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    general_notes = models.TextField(blank=True, help_text="Hair style, preferences, etc.")
    stylist = models.ForeignKey(User, on_delete=models.CASCADE, related_name="clients")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"