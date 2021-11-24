# AppShop

## Description

An in-depth paragraph about your project and overview of use.

## Getting Started

### Dependencies

### Installing

First, add these lines to your /etc/hosts file:
```
127.0.0.1  appshop.local
127.0.0.1  admin.appshop.local
127.0.0.1  api.appshop.local
127.0.0.1  db.appshop.local
```
and run services with Docker Compose:
```
COMPOSE_HTTP_TIMEOUT=1000 docker-compose -f docker-compose.dev.yml up
```
then seeding database by run following command:
```
docker-compose exec -T api npm run db:reset
```
now project is ready

### Executing program

## Help

## Authors

## License

## Acknowledgments