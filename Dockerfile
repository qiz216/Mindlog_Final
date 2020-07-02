FROM python:3.7-alpine
ENV PYTHONUNBUFFERED 1
WORKDIR /app
RUN pip install pipenv
COPY ./Pipfile* /app/

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev libffi-dev zlib-dev jpeg-dev

RUN pipenv install --dev

# copy entrypoint.sh
COPY ./entrypoint.sh .

# run entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]