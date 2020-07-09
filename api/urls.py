from .views import *
from django.urls import path
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'messages', MessageViewSet, basename='messages')
router.register(r'users', UserViewSet, basename='user')
router.register(r'scheduler', SchedulerViewSet, basename='scheduler')
urlpatterns = router.urls

## self defined
urlpatterns += [
    path(r'sendmessage', SendMessageView.as_view()),
    path(r'twilioport', TwilioAPI.as_view()),
]