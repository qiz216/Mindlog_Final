from django.db import models
from django.conf import settings
from messenger.twilio_msg import twilio_msg
from datetime import datetime, timedelta
from messenger.models import Message
from django.utils import timezone

# Create your models here.
class Schedule(models.Model):
    id = models.AutoField(primary_key=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='schedule', on_delete=models.CASCADE, null=True)
    schedule_time = models.TimeField()

def greeting_job():
    ## get all schedules
    now = timezone.now()
    start = (now - timedelta(minutes=5)).time()
    end = (now + timedelta(minutes=5)).time()
    schedules = Schedule.objects.filter(schedule_time__range = (start, end)).all()  #
    for sche in schedules:
        twilio_msg.send_msg(sche.owner)
    print('test')

def reminder_job():
    ## get all schedules
    start = timezone.now()
    end = (start + timedelta(hours=6))
    messsages = Message.objects.filter(time_start__range = (start, end), tag = 'calender').all() #
    for msg in messsages:
        twilio_msg.send_msg(msg.owner, message = "Event reminder: {}".format(msg.message))
    print('test')

from . import scheduler
if settings.SCHEDULER_AUTOSTART:
    scheduler.start()