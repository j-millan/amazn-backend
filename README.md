## Description

Backend service for [Amazn](https://github.com/j-millan/amazn) web app.

## Project setup
1. Create PostgreSQL database (Fedora-based distros)
	*  Install PostgreSQL
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
4. Duplicate the `.env` file as `.env.local` and replace variable values with the values we used to create our database.

5. Run migrations:
	```bash
	$ npm run migration:run
	```

## Compile and run the project
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
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
