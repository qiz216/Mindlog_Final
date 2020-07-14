import logging

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.executors.pool import ProcessPoolExecutor, ThreadPoolExecutor
from django_apscheduler.jobstores import register_events, register_job, DjangoJobStore
#from scheduler.models import greeting_job
from django.conf import settings
from . import scheduler
from django.db import models
from django.conf import settings
from messenger.twilio_msg import twilio_msg
from datetime import datetime, timedelta
from messenger.models import Message
from django.utils import timezone

# Create scheduler to run in a thread inside the application process
scheduler = BackgroundScheduler(settings.SCHEDULER_CONFIG)


def greeting_job():
    # get all schedules
    from scheduler.models import Schedule
    now = timezone.localtime()
    print(now)
    print(timezone.localtime())
    start = (now - timedelta(minutes=5)).time()
    end = (now + timedelta(minutes=5)).time()
    print("WE MADE IT 2")
    schedules = Schedule.objects.filter(
        schedule_time__range=(start, end)).all()  #
    print("WE MADE IT 3")
    for sche in schedules:
        print('y')
        x = twilio_msg.send_msg(sche.owner)
        print(x)
    print('test')


def start():
    if settings.DEBUG:
        # Hook into the apscheduler logger
        logging.basicConfig()
        logging.getLogger('apscheduler').setLevel(logging.DEBUG)

    scheduler.add_job(greeting_job, "cron", id="send_post",
                      minute='0,12,13,14,15,16,52,53,54,55,56,57,58,59', replace_existing=True)
    # Add the scheduled jobs to the Django admin interface
    register_events(scheduler)
    scheduler.start()
