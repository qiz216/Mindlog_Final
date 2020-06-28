from django.contrib import admin
from .models import Message,Sender
# Register your models here.
admin.site.register(Sender)
admin.site.register(Message)