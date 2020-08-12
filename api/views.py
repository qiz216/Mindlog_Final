from django.shortcuts import render, get_object_or_404
from django.forms.models import model_to_dict
from django.db.models import Q
import json
from datetime import datetime, time
from dateutil.relativedelta import relativedelta
from django.core.serializers.json import DjangoJSONEncoder
from rest_framework.decorators import action
from django.utils import timezone
# query from messenger app
from messenger.twilio_msg import twilio_msg
# Create your views here.
from .serializers import *
from users.models import *
from messenger.models import *
from scheduler.models import *
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework import status, generics, mixins


@action(detail=True, methods=['post', 'get', 'patch'])
class MessageViewSet(viewsets.ModelViewSet):
    # query set
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = MessageSerializer

    def get_queryset(self):
        # when querying do /api/message?tag=blog
        params = {'deleted': False}
        tag = self.request.GET.get('tag')
        if tag:
            params['tag'] = tag
        year = self.request.GET.get('year')
        month = self.request.GET.get('month')
        day = self.request.GET.get('day')
        if year or month or day:
            today = datetime.today()
            start = {}
            gap = {}
            if year:
                start['year'] = int(year)
                gap = {'year':1}
            else:
                start['year'] = today.year

            if month:
                start['month'] = int(month)
                gap = {'months':1}
            else:
                if day:
                    start['month']  = today.month
                else:
                    start['month'] = 1

            if day:
                start['day'] = int(day)
                gap = {'days': 1}
            else:
                start['day'] = 1
            try:
                start = datetime(**start)
                end = start + relativedelta(**gap)
                date_range = (start, end)
                params['created_at__range'] = date_range
            except:
                pass
        return self.request.user.messages.filter(**params)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def destroy(self, *args, **kwargs):
        """
        A message will not be deleted in database.
        We will set the "delete" flag from false to true.
        """
        Message.objects.filter(id=kwargs['pk']).update(
            deleted=True, deleted_at=timezone.now())
        return Response(status=status.HTTP_204_NO_CONTENT)
    # patch/post


@action(detail=True, methods=['get', 'patch', 'delete'])
class UserViewSet(viewsets.ModelViewSet):
    # query set
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = CustomUserSerializer

    def get_queryset(self):
        return CustomUser.objects.filter().all()


# send messages just for testing
class SendMessageView(APIView):
    def post(self, request, format=None):
        result = twilio_msg.send_msg(request.user)
        if result.lower() == 'success!':
            return Response({'result': result}, status=status.HTTP_201_CREATED)
        return Response({'result': result}, status=status.HTTP_400_BAD_REQUEST)


# api post
class TwilioAPI(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        data = request.data.dict()
        user_set = CustomUser.objects.filter(phone=data['From'])
        if user_set:
            user = user_set[0]
            wit = wit_analysis('', data['Body'])
            wit_attr = wit.get_attributes()
            Message.objects.create(
                owner=user,
                title='phone text',
                message=data['Body'],
                twilio_msg_sid=data['MessageSid'],
                tag=wit_attr['tag'],
                sentiment=wit_attr['sentiment'],
                location=wit_attr['location'],
                event=wit_attr['event'],
                time_start=wit_attr['time_start'],
                time_end=wit_attr['time_end'])
            result = 'success'
            return Response('', status=status.HTTP_201_CREATED, content_type="text/xml")
        return Response('', status=status.HTTP_400_BAD_REQUEST, content_type="text/xml")


@action(detail=True, methods=['get', 'patch', 'post', 'delete'])
class SchedulerViewSet(viewsets.ModelViewSet):
    # query set
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = SchedulerSerializer

    def get_queryset(self):
        return Schedule.objects.filter(owner=self.request.user).all()

    def list(self, request):
        query_set = self.get_queryset()
        return Response({'schedule':list(map(lambda x: {'id':x.id, 'time':x.schedule_time.strftime('%I:%M %p')},query_set))}, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
