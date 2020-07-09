from django.db import models
from django.conf import settings
from django.utils.html import escape
from datetime import datetime, timedelta
from django_resized import ResizedImageField
from phonenumber_field.modelfields import PhoneNumberField ## phone number parser
from .messenger_parameter import * ##for model choices
from .wit_analysis import wit_analysis
import os
from uuid import uuid4
from django.conf import settings
from django.utils import timezone

class Sender(models.Model):
    """
    The twilio accounts.
    will add more fields in the future to make it act like a "character"
    """
    id = models.AutoField(primary_key=True)
    nickname = models.CharField(max_length=100)
    twilio_sid = models.CharField(max_length=100)
    twilio_token = models.CharField(max_length=100)
    phone = PhoneNumberField()
    state = models.CharField(max_length=100, choices = STATE_CHOICES, default = 'NY')
    created_at = models.DateTimeField(default=timezone.now)
    msg_sent = models.IntegerField(default=0)
    def __str__(self):
        return self.nickname

class Message(models.Model):
    """Message sent from Sender or replied from Receiver."""
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    message = models.TextField()
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='messages', on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    tag = models.CharField(max_length=100,  choices = MSG_TAG_CHOICES, default = 'thoughts')
    sentiment = models.CharField(max_length=100,  choices = SENTIMENT_CHOICES, default = 'neutral')
    twilio_msg_sid = models.CharField(max_length=100, blank=True, null=True)
    deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(blank = True, null=True)
    location = models.CharField(max_length=200, blank = True, null=True)
    time_start = models.DateTimeField(blank=True, null=True)
    time_end = models.DateTimeField(blank=True, null=True)
    event = models.CharField(max_length=200, blank = True, null=True)

    def __str__(self):
        return self.message

