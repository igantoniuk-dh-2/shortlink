# SHORLINK - сервис сокращения ссылок

### Стек

#### backend

1. typescript: nestjs
2. mongodb
3. redis
4. jwt
5. swagger

#### frontend

1. reactjs
2. tailwind

### REST API

Спецификация restapi - см swagger по url /api в !prod режиме

### Запуск

#### docker compose

#### настройка портов - через docker-compose.yml (при изменении порта backend, не забудь изменить порт в REACT_APP_BACKEND_PORT в docker-compose.yml)

```sh
docker compose build
docker compose up
```

### environment (см environment-sample)

```sh
REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
REDIS_DB=

JWT_SECRET=

MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_DATABASE=
```
