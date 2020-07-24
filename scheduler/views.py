from django.shortcuts import render
from .models import Schedule
from django.db import models
from django.conf import settings
from messenger.twilio_msg import twilio_msg
from datetime import datetime, timedelta
from messenger.models import Message
from django.utils import timezone
# Create your views here.


def greeting_job():
    # get all schedules
    now = timezone.now()
    print("WE MADE IT")
    start = (now - timedelta(minutes=5)).time()
    end = (now + timedelta(minutes=5)).time()
    print("WE MADE IT 2")
    schedules = Schedule.objects.filter(
        schedule_time__range=(start, end)).all()  #
    print("WE MADE IT 3")
    for sche in schedules:
        twilio_msg.send_msg(sche.owner)
    print('test')