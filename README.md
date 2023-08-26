# SHORLINK - сервис сокращения ссылок

### Стек

1. typescript: nestjs
2. mongodb
3. redis
4. jwt
5. swagger

### REST API

Спецификация restapi - см swagger по url /api в !prod режиме

### Запуск

```sh
npm i
docker compose up
npm build
npm start
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
