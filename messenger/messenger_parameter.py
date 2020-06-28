## max number of messages each sender can send
max_messages_number = 100
## max dates a sender can serve a receiver
max_dates = 60
## max number of responsibility a sender can take
max_receivers = 10

## Choices for models
## State choices
STATE_CHOICES = (('AL', 'Alabama'), ('AZ', 'Arizona'), ('AR', 'Arkansas'), ('CA', 'California'), ('CO', 'Colorado'), ('CT', 'Connecticut'), ('DE', 'Delaware'),
 ('DC', 'District of Columbia'), ('FL', 'Florida'), ('GA', 'Georgia'), ('ID', 'Idaho'), ('IL', 'Illinois'), ('IN', 'Indiana'), ('IA', 'Iowa'),
 ('KS', 'Kansas'), ('KY', 'Kentucky'), ('LA', 'Louisiana'), ('ME', 'Maine'), ('MD', 'Maryland'), ('MA', 'Massachusetts'), ('MI', 'Michigan'),
 ('MN', 'Minnesota'), ('MS', 'Mississippi'), ('MO', 'Missouri'), ('MT', 'Montana'), ('NE', 'Nebraska'), ('NV', 'Nevada'), ('NH', 'New Hampshire'),
 ('NJ', 'New Jersey'), ('NM', 'New Mexico'), ('NY', 'New York'), ('NC', 'North Carolina'), ('ND', 'North Dakota'), ('OH', 'Ohio'), ('OK', 'Oklahoma'),
 ('OR', 'Oregon'), ('PA', 'Pennsylvania'), ('RI', 'Rhode Island'), ('SC', 'South Carolina'), ('SD', 'South Dakota'), ('TN', 'Tennessee'), ('TX', 'Texas'),
 ('UT', 'Utah'), ('VT', 'Vermont'), ('VA', 'Virginia'), ('WA', 'Washington'), ('WV', 'West Virginia'), ('WI', 'Wisconsin'), ('WY', 'Wyoming'))

## Gender choices
GENDER_CHOICES = (('Agender', 'Agender'),('Bigender', 'Bigender'),('Cisgender', 'Cisgender'),
                  ('Cis Female', 'Cis Female'),('Cis Male', 'Cis Male'),
                  ('Female', 'Female'),('Gender Fluid', 'Gender Fluid'),('Gender Questioning', 'Gender Questioning'),
                  ('Genderqueer', 'Genderqueer'),('Intersex', 'Intersex'),('Male', 'Male'),('Neither', 'Neither'),
                  ('Non-binary', 'Non-binary'),('Other', 'Other'))

## purpose of the message
MESSAGE_TYPE_CHOICES = (('1', 'Send to User'), ('2', 'Reply from User'))

## different group of user
GROUP_CHOICES = (('normal', 'normal'), ('paid','paid'))

## different choices for tags
MSG_TAG_CHOICES = (('blog','blog'), ('thoughts','thoughts'), ('reminder','reminder'), ('calender','calender'))

## choices for sentiment
SENTIMENT_CHOICES = (('positive','positive'), ('neutral','neutral'), ('negative','negative'))