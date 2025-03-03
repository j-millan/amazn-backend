## Description

    Backend service for[Amazn](https://github.com/j-millan/amazn) web app.

## Project setup

### Using docker (recommended)

1. Install and configure the docker engine

   * For Linux, follow [this tutorial](https://docs.docker.com/engine/install/),
   * for Windows, follow [this one](https://docs.docker.com/desktop/setup/install/windows-install/).
2. Clone the repository

   ```bash
   $ git clone git@github.com:j-millan/amazn-backend.git
   ```
3. Install node packages:

   ```bash
   $ npm install
   ```
4. Set up the environment (steps further below).
5. Start the docker container

   ```bash
   $ docker compose build
   $ docker compose up
   ```
6. Run the database seeders:

   ```bash
   $ npm run seed:run
   ```

## Env configuration

The `.env.template` file contains the variables needed to start the app. Copy the file and rename it to `.env` and fill in the values.

### App variables

- `APP_ENV`: specifies in which environment the app is running.
  Possible values: `dev`, `qa`, `pre`, `prod`. Use `dev` for local.
- `APP_PORT`: the port where the app will accept connections.
- `APP_DOMAIN`: the domain where the app is running. Use `http://localhost` for local.
- `APP_STATIC_PATH`: the path where static files will be served. Example: `/static/`.

### JWT variables

- `JWT_EXPIRES_IN`: the expiration time of the auth tokens, in seconds.
- `JWT_SECRET`: the secret used to generate the auth tokens. Generate using the next command:

```bash
$ openssl rand  -hex 32
```

### OTP variables

- `OTP_EXPIRES_IN`: the expiration time of the OTPs, in milliseconds.
- `OTP_SECRET`: the secret used to generate the OTPs. Generate using the next command:

```bash
$ openssl rand  -hex 32
```

### Mailer variables

These are the parameters for the email service (used to send OTPs). Sign up for an email delivery provider (like mailtrap), and use the parameters provided by it.

### Database variables

These are the parameters for the postgresql database. If you're setting up the app using Docker, you can fill in the desired values (execpt for `DB_HOST`, which has to be `amazn_db`) and the docker compose app will use them to set up the database.

## Docker usage

```bash
# Build the docker images (without starting the compose app)
$ docker compose build

# Build the docker images without cache
$ docker compose build --no-cache

# Start the compose app
$ docker compose up

# Rebuild the images and start the compose app
$ docker compose up --build

# Remove the containers
$ docker compose down

# Remove the containers and its volumes
$ docker compose down -v
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migrations

* Generate migrations based on entities:
  ```bash
  $ npm run migration:generate
  ```
* Apply migrations to the database:
  ```bash
  $ npm run migration:run
  ```

## Seeding

* Run seeds:

  ```bash
  $ npm run seed:run
  ```
* Create new seed:

  ```bash
  $ npm run seed:create -- --name ./database/seeds/{SEEDER_FILE_NAME}.ts
  ```

  For consistency, seeder file names should be in `PascalCase`, like migrations. E.g.: `ProductSeed.ts`

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
