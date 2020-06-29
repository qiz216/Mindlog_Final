from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
from phonenumber_field.modelfields import PhoneNumberField ## phone number parser
from django_resized import ResizedImageField
from datetime import datetime, timedelta
from messenger.messenger_parameter import * ##for model choices
from uuid import uuid4
import os
from messenger.messenger_parameter import * 

## upload file
def path_and_rename(instance, filename):
    upload_to = 'photos'
    ext = filename.split('.')[-1]
    # get filename
    if instance.pk:
        filename = '{}.{}'.format(instance.pk, ext)
    else:
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
    # return the whole path to the file
    return os.path.join(upload_to, filename)

class CustomUser(AbstractUser):
    gender = models.CharField(max_length=100, choices = GENDER_CHOICES, default = 'Agender')
    phone = PhoneNumberField(unique = True, null = True)
    birthday = models.DateField(blank=True, null = True)
    state = models.CharField(max_length=100, choices = STATE_CHOICES, default = 'NY')
    city = models.CharField(max_length=100, blank = True, null=True)
    photo = ResizedImageField(blank=True, null=True, upload_to = path_and_rename)
    email = models.EmailField(blank=True, null=True)
    favorite_artist = models.CharField(max_length=100, blank=True, null=True)
    favorite_song = models.CharField(max_length=100, blank=True, null=True)
    favorite_show = models.CharField(max_length=100, blank=True, null=True)
    favorite_movie = models.CharField(max_length=100, blank=True, null=True)
    favorite_color = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(default=datetime.now)
    user_group = models.CharField(max_length=100, choices = GROUP_CHOICES, default = 'normal')
    sender = models.ForeignKey('messenger.Sender', on_delete=models.CASCADE, null = True)
    def __str__(self):
        return self.email