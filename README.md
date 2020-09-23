

## Summary

This is a side project created by James Botwina and Louis Zhao to explore how SMS text messages can be used to remind users to write micro-journal entries directly from thier phone's messaging applicaiton. You can also add journal entries on the the applicaiton's home page. We chose to build this application because we are interested in the creating productivity tools for consumers and internal teams alike. 
You can find the deployment on [mymindlog.me](http://www.mymindlog.me).

# Web Stack
We used React on the front end and Django on the back end because it is a popular stack among start ups. 
* Django and its templating language also allowed us to iterated on the project quickly when we were experimenting with Twilio's API to send SMS text messages. Django's admin page was also extremely useful as we tested out different database schema. Eventually, we chose to incorporate the Django REST Framework to accomodate a React front end. 
* We chose to use React because we wanted to gain exposure to a modern JS framework. Also, using a JS framework on the front end gave us access to widgets like Ant Design's Calendar on the Previous Messages tab.
Also, we used django-knox for token-based authentication as part of the login process and to make requests to the server. In doing so, we learned how to use Postman test the application. 
* We deployed the application on Digital Ocean. 

# Conclusion
This is our first completion of a web application. We learned everything on the fly and collaborated over github for 3 months. Both of us relied on a solid foundation of computer science when times got tough (particularly authentication with Redux). We encourage people to test out our application and please give us feedback.  


