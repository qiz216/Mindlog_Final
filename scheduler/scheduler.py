import logging

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.executors.pool import ProcessPoolExecutor, ThreadPoolExecutor
from django_apscheduler.jobstores import register_events, register_job, DjangoJobStore
from scheduler.models import *
from django.conf import settings


# Create scheduler to run in a thread inside the application process
scheduler = BackgroundScheduler(settings.SCHEDULER_CONFIG)

def start():
    if settings.DEBUG:
      	# Hook into the apscheduler logger
        logging.basicConfig()
        logging.getLogger('apscheduler').setLevel(logging.DEBUG)

    scheduler.add_job(greeting_job, "cron", id="send_post", minute='0,10,20,30,40,50', replace_existing=True)
    scheduler.add_job(reminder_job, "cron", id="send_reminder", hour='0,6,12,18', minute=10,replace_existing=True)
    # Add the scheduled jobs to the Django admin interface
    register_events(scheduler)
    scheduler.start()