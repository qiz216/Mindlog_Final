from django import forms
from django.forms import CharField, Textarea, IntegerField

class GuestBookForm(forms.Form):
    title = CharField(label= "Title",
                    required= False,
                    widget= Textarea(attrs={'cols':'10', 'rows':'1'}))
    msg = CharField(label= "Leave a message.",
                    required= True,
                    widget= Textarea(attrs={'cols':'30', 'rows':'5'}),
                    min_length=0)
