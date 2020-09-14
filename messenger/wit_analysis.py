import requests
import os
from datetime import datetime
from django.utils import timezone
WIT_TOKEN = "QPYVY5ZHHQBGKBCR6ESUSJQVLU2CIBMM"


class wit_analysis():
    """
    a class that can do analysis for messages using wit api
    """

    def __init__(self, title, message_body):
        self.title = title
        self.message_body = message_body
        self.auth = 'Bearer {}'.format(WIT_TOKEN)
        self.url = 'https://api.wit.ai/message?q={}'.format(
            title.strip() + '. ' + message_body.strip())
        try:
            self.result = requests.get(
                self.url, headers={'Authorization': self.auth}).json()
        except:
            self.result = {'text': '', 'intents': [],
                           'entities': {}, 'traits': {}}

    def time_format(self, time):
        local_time = datetime.strptime(time.split('.')[0], '%Y-%m-%dT%H:%M:%S')
        return local_time

    def get_tag(self):
        """
        Get the tag from response
        """
        if self.title.strip() != '':
            return 'blog'
        if len(self.result['intents']) == 0:
            return 'thoughts'
        else:
            return self.result['intents'][0]['name']

    def get_sentiment(self):
        """
        get the sentiment, which could be `positive`, `negative` and `neutral`
        """
        if 'wit$sentiment' in self.result['traits'].keys():
            if len(self.result['traits']['wit$sentiment']) > 0:
                return self.result['traits']['wit$sentiment'][0]['value']
        return 'neutral'

    def get_schedule(self):
        """
        will return None if couldn't find time
        return a dictionary with all info
        """
        schedule = {'event': '', 'location': '',
                    'time_start': None, 'time_end': None}
        if 'wit$datetime:datetime' in self.result['entities']:
            if len(self.result['entities']['wit$datetime:datetime']) > 0:
                time = self.result['entities']['wit$datetime:datetime'][0]
                if time['type'] == 'value':
                    try:
                        schedule['time_start'] = self.time_format(
                            time['value'])
                    except:
                        pass
                elif time['type'] == 'interval':
                    try:
                        schedule['time_start'] = self.time_format(
                            time['from']['value'])
                        schedule['time_end'] = self.time_format(
                            time['to']['value'])
                    except:
                        pass

        if 'wit$location:location' in self.result['entities']:
            if len(self.result['entities']['wit$location:location']) > 0:
                try:
                    schedule['location'] = self.result['entities']['wit$location:location'][0]['value']
                except:
                    pass

        if 'wit$reminder:reminder' in self.result['entities']:
            if len(self.result['entities']['wit$reminder:reminder']) > 0:
                try:
                    schedule['event'] = self.result['entities']['wit$reminder:reminder'][0]['value']
                except:
                    pass

        if 'wit$agenda_entry:agenda_entry' in self.result['entities']:
            if len(self.result['entities']['wit$agenda_entry:agenda_entry']) > 0:
                try:
                    schedule['event'] = self.result['entities']['wit$agenda_entry:agenda_entry'][0]['value']
                except:
                    pass

        return schedule

    def get_attributes(self):
        attributes = self.get_schedule()
        attributes['tag'] = self.get_tag()
        attributes['sentiment'] = self.get_sentiment()
        return attributes
