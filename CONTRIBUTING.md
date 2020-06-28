# Contributing

Thank you for help improving Mindful. All kinds of contributions are welcome. Please note that this starter project is *intentionally* basic: I don't plan to add environment variables, Docker, or other production-appropriate features as I feel they will overwhelm beginners. But I'm open to suggestions!

Please submit an Issue or even better a PR and I'll review :)

## Database
### MongoDB
I find [Mongo Atlas](https://www.mongodb.com/cloud/atlas) quite interesting because it is providing a FREE AWS/Azure/GCP cluster to run the Mongodb. 
- pros
  - Mongo Atlas provides a free database management portal, making it more visible how django works in database.
  - With Mongo we can have more complicated data structures like lists (Which makes it easier to query history).
  - The storage is 512MB for free but if you pay 9/month you get 2GB. Github schoolpackage actually provided 200 USD credits.
  - There is a third-party engine [Djongo](https://djongo.readthedocs.io/docs/get-started/) to make Django work with Mongo.
- cons
  - read/write speed slower than relational db.
  - djongo works with django 2 but not django 3.
### Postgres
[Heroku](https://devcenter.heroku.com/articles/heroku-postgresql) has a free postgresql service 
- pros
  - suitable for our needs since the data models don't seem to be too complicated.
  - free version only allow 10k rows. But Github package giving 168 dollars which can support 10,000,000 rows for 18 months.
- cons

## Features
