## Description

Backend service for [Amazn](https://github.com/j-millan/amazn) web app.

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
   $ docker compose up --watch
   ```

### Setting up the project manually

1. Create PostgreSQL database (Fedora-based distros)

   * Install PostgreSQL

     ```bash
     $ sudo dnf install postgresql postgresql-server
     $ sudo postgresql-setup --initdb
     $ sudo systemctl enable postgresql.service && systemctl start postgresql.service
     ```
   * Create database

     ```bash
     $ sudo -u postgres createdb amazndb -O postgres --port=$PORT --username=$USERNAME --password
     ```

     (Enter the password when prompted).
   * Change the authentication method from `ident` to `trust` in the `pg_hba.conf` file.

     ```bash
     $ sudo vim $PATH_TO_PG_HBA_CONF 
     ```

     ```conf
     # TYPE  DATABASE        USER            ADDRESS                 METHOD
     # "local" is for Unix domain socket connections only
     local   all             all                                     peer
     # IPv4 local connections:
     host    all             all             127.0.0.1/32            ident <-- change to trust
     # IPv6 local connections:
     host    all             all             ::1/128                 ident <-- change to trust
     # Allow replication connections from localhost, by a user with the
     # replication privilege.
     local   replication     all                                     peer
     host    replication     all             127.0.0.1/32            ident <-- change to trust
     host    replication     all             ::1/128                	ident <-- change to trust
     ```
   * Install `uuid-ossp` extension for pgsql:

     ```bash
     $ sudo dnf install postgresql-contrib
     $ sudo -u postgres psql -d amazndb
     amazndb=> CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 
     amazndb=> exit
     $ sudo systemctl restart postgresql.service
     ```
2. Clone the repository:

   ```bash
   $ git clone git@github.com:j-millan/amazn-backend.git
   ```
3. Install node packages:

   ```bash
   $ npm install
   ```
5. Set up the environment (steps further below).
6. Run migrations:

   ```bash
   $ npm run migration:run
   ```

## Env configuration

The `.env.template` file contains the variables needed to start the app. Copy the file and rename it to `.env` and fill in the values.

### App variables
`APP_ENV` specifies in which environment the app is running. Use `dev` for local.
`APP_PORT` the port where the API will accept connections.

### JWT variables
`JWT_EXPIRES_IN` the expiration time of the auth tokens, in seconds.
`JWT_SECRET` the secret used to generate the auth tokens. Generate using the next command:

```bash
$ openssl rand  -hex 32
```
### OTP variables
`OTP_EXPIRES_IN` the expiration time of the OTPs, in milliseconds.
`OTP_SECRET` the secret used to generate the OTPs. Generate using the next command:

```bash
$ openssl rand  -hex 32
```

### Mailer variables
These are the parameters for the email service (used to send OTPs). Sign up for an email delivery provider (like mailtrap), and use the parameters provided by it. 

### Database variables
These are the parameters for the postgresql database. If you're setting up the database manually, then you have to fill the variable values with the parameters you used to create the database (using the steps above), if you're setting up the app using Docker, you can fill in the desired values (execpt for `DB_HOST` which has to be `amazn_db`) and the docker compose app will use them to set up the database.

## Compile and run the project

```bash
# development
$ npm run start:dev

# development (using docker)
$ docker compose up
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

### With Docker
* Generate migrations based on entities:
  ```bash
  $ docker exec CONTAINER_ID npm run migration:generate
  ```
* Apply migrations to the database:
  ```bash
  $ docker exec CONTAINER_ID npm run migration:run
  ```

You can get the container ID with the following command:
```bash
$ docker ps
```

### Without Docker
* Generate migrations based on entities:
  ```bash
  $ npm run migration:generate
  ```
* Apply migrations to the database:
  ```bash
  $ npm run migration:run
  ```

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
