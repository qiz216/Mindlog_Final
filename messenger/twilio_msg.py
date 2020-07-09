from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse
from django.db.models import Count
from datetime import datetime
from messenger.models import *
from users.models import *
from messenger.messenger_parameter import *
from messenger.wit_analysis import wit_analysis

class twilio_msg():
    """
    a class of function that can be used in the views
    """
    def __init__(self, request):
        self.description = 'A class of function'

    @staticmethod
    def assign_sender(user):
        """
        Assign receiver to a sender
        Rule: choose the sender with least number of receivers
        Use only when there is no current sender
        :param receiver:
        :return: resender
        """
        sender_set = Sender.objects.order_by('msg_sent')
        if not sender_set:
            return None
        else:
            sender = sender_set[0]
            CustomUser.objects.filter(id = user.id).update(sender = sender)
        return sender

    @staticmethod
    def get_sender(user):
        # get receiver
        if user.sender:
            return user.sender
        return twilio_msg.assign_sender(user)

    @staticmethod
    def customize_msg(user, sender):
        """
        Generate a custom
        :param receiver: Receiver
        :param sender: Sender
        :return: A customized message string
        """
        return "Hi {}, it's {}! What's up with you? How's the weather in {}? Don't forget to relax and write something today.".format(user.username,
                                                                                   sender.nickname,
                                                                                   user.state) # customize the message, should add more customization in the future

    @staticmethod
    def send_msg(user, message = ''):
        """
        Send a greeting message
        :param request:
        :return: the log message
        """
        sender = twilio_msg.get_sender(user)
        ## If receiver not added phone number return error
        if not user.phone:
            return 'You need to provide your phone number. Please complete your profile!'
        if not sender:
            return 'Currently no available Sender from our server'

        ## send message
        if message == '':
            message_to_broadcast = twilio_msg.customize_msg(user, sender)
        else:
            message_to_broadcast = message
        client = Client(sender.twilio_sid, sender.twilio_token) # create client object
        try:
            response = client.messages.create(to = str(user.phone),
                               from_ = str(sender.phone),
                               body = message_to_broadcast)
        ## response is MessageInstance object. https://www.twilio.com/docs/sms/api/message-resource
        except:
            return 'Sorry. Message failed to sent! Did you unsubscribe? :('
        if response.error_code:
            return 'Sorry. Message failed to sent!'
        ## update sender msg_sent field add 1
        Sender.objects.filter(id = sender.id).update(msg_sent = sender.msg_sent + 1)
        return 'Success!'

    @staticmethod
    def get_last_sync_time(user):
        last_message = Message.objects.filter(owner_id = user.id).order_by('-created_at')
        if not last_message:
            last_sync_time = datetime(2000, 1, 1, 0, 0, 0)
        else:
            last_sync_time = last_message[0].created_at
        return last_sync_time

    @staticmethod
    def sync_msg(user):
        """
        Sync the messages send from user to internal database
        :param request:
        :return: new messages since last sync up
        """
        # get current receiver and sender
        sender = twilio_msg.get_sender(user)
        if not sender:
            return []
        # get last sync time
        last_sync_time = twilio_msg.get_last_sync_time(user)
        # only get message after
        client = Client(sender.twilio_sid, sender.twilio_token) # create client object
        messages = client.messages.list(from_ = str(user.phone),# str(receiver.phone)
                                        date_sent_after = last_sync_time)

        ## create models
        for message in messages:
            wit = wit_analysis('',message.body)
            wit_attr = wit.get_attributes()
            Message.objects.create(sender = sender, owner = user,
                            message = message.body,
                            twilio_msg_sid = message.sid,
                            tag = wit_attr['tag'],
                            sentiment = wit_attr['sentiment'],
                            location = wit_attr['location'],
                            event = wit_attr['todo'],
                            time_start = wit_attr['from'],
                            time_end = wit_attr['to'])

    @staticmethod
    def get_history_replies(user, tag = ''):
        if tag == '':
            messages = Message.objects.filter(owner_id = user.id, deleted = False).order_by('-created_at').all()
        else:
            messages = Message.objects.filter(owner_id = user.id, deleted = False, tag = tag).order_by('-created_at').all()
        return messages

    @staticmethod
    def get_user_info(user):
        sender = twilio_msg.get_sender(user)
        if receiver == None:
            return {'error': 'Profile not provided'}
        if sender == None:
            sender_nickname = ''
        else:
            sender_nickname = sender.nickname
        messages = twilio_msg.get_history_replies(receiver)
        data = {'receiver': receiver.nickname,
                'state': receiver.state,
                'birthday': datetime.strftime(receiver.birthday, '%Y-%m-%d'),
                'sender': sender_nickname,
                'messages': messages}
        return data
