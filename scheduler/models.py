from . import scheduler
from django.db import models
from django.conf import settings
from messenger.twilio_msg import twilio_msg
from datetime import datetime, timedelta
from messenger.models import Message
from django.utils import timezone


# Create your models here.


class Schedule(models.Model):
    id = models.AutoField(primary_key=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='schedule', on_delete=models.CASCADE, null=True)
    schedule_time = models.TimeField()
    topic = models.CharField(max_length=20, default="greeting")


if settings.SCHEDULER_AUTOSTART:
    scheduler.start()
