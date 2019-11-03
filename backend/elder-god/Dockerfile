# Develop image
FROM python:3.7-slim as dev

# Don't periodically check PyPI to determine whether a new version of pip is available for download.
ENV PIP_DISABLE_PIP_VERSION_CHECK=on
# Disable package cache.
ENV PIP_NO_CACHE_DIR=off
# Python won’t try to write .pyc files on the import of source modules.
ENV PYTHONDONTWRITEBYTECODE=on
# install a handler for SIGSEGV, SIGFPE, SIGABRT, SIGBUS and SIGILL signals to dump the Python traceback
ENV PYTHONFAULTHANDLER=on
# Force the stdout and stderr streams to be unbuffered.
ENV PYTHONUNBUFFERED=on
# set workdir as PYTHONPATH
ENV PYTHONPATH=/opt/app
# poetry lock command works incorrectly with confuent_kafka package on new versions
ENV POETRY_VERSION=0.12.10

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/* \
    && pip install "poetry==$POETRY_VERSION" \
    && poetry config settings.virtualenvs.create false

RUN mkdir /opt/app
WORKDIR /opt/app

COPY pyproject.toml poetry.lock /opt/app/
RUN poetry install --no-dev --no-interaction --no-ansi

EXPOSE 8000
