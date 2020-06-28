from django.urls import path, include
from .views import *

urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('about/', AboutPageView.as_view(), name='about'),
    path('broadcast/', broadcast_sms, name='broadcast_sms'), # send a "what's up" message
    path('blog/', BlogPageView, name='blog'), # get message response
]

