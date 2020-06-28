from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView
from django.views import View
from django.conf import settings                                                                                                                                                       
from django.http import HttpResponse, HttpResponseRedirect
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib import messages
from .forms import GuestBookForm
from .models import *
from datetime import datetime as dt
from django.urls import reverse
from .messenger_parameter import *
from .twilio_msg import twilio_msg
from storages.backends.s3boto3 import S3Boto3Storage ## storage
from twilio.twiml.voice_response import VoiceResponse, Say
from django.core.mail import send_mail
from messenger.wit_analysis import wit_analysis
#send_mail('Hello', 'Example message', 'app175527444@heroku.com', ["qiz216@outlook.com"],fail_silently=False,)
# Showing home page
class HomePageView(TemplateView):
    template_name = 'messenger/home.html'

# Showing about page
class AboutPageView(TemplateView):
    template_name = 'messenger/about.html'

# to broad cast a message
@login_required(login_url='/accounts/login')
def broadcast_sms(request):
    """
    Send message to current user.
    find the Sender with least number of message sent
    Add msg_Send in Sender field by 1.
    """
    data = {'alert': twilio_msg.send_msg(request.user)}
    return render(request, 'messenger/success.html', data)

# show history
@login_required(login_url='/accounts/login')
def BlogPageView(request):
    user = request.user
    twilio_msg.sync_msg(user)
    sender = twilio_msg.get_sender(user)
    image_tag = "{% static 'images/logo.png' %}"
    messages = twilio_msg.get_history_replies(user, 'blog')
    if user.photo:
        image_tag = user.photo.url.split('?')[0]
    for message in messages:
        message.sentiment_color = {'positive':'honeydew','neutral':'lightyellow','negative':"lightgrey"}[message.sentiment]
    data = {'messages': messages, 'image_tag': image_tag, 'username':user.username, 'form':GuestBookForm()}
    return render(request, "messenger/blog_type.html", data)