#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z $DATABASE_HOST $DATABASE_PORT; do
    sleep 0.1
done

echo "PostgreSQL started"


pipenv run python manage.py flush --no-input
pipenv run python manage.py migrate

exec "$@"