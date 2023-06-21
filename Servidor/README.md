<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  

## Description

Api creada para comunicar la aplicacion web del sistema de reportes minero con el backend y la base de datos

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Postgres
```bash
# instala los package necesarios de postgres
$ npm i pg
```

## ORM
```bash
# instala sequelize ORM para postgres
$ npm install --save @nestjs/sequelize sequelize sequelize-typescript postgres
$ npm install --save-dev @types/sequelize
```
## ConfigModule
```bash
# instala configmodule usado para acceder a variables de entorno
$ npm i --save @nestjs/config
```

## JWT
```bash
# instala JWT para comunicarse entre el frontend y la api
$ npm install --save @nestjs/jwt
```

# Configuración actual
* El servidor se encuentra en localhost:3001 (el puerto puede ser cambiado en main.ts)

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
