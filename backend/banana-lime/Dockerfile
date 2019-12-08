FROM haskell:8.6.5

WORKDIR /opt/app

RUN apt-get update && apt-get -y install libpq-dev

ENTRYPOINT [ "stack", "run", "--allow-different-user"]
