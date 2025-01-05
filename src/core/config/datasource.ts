import { DataSource } from 'typeorm';

export const CONNECTION_SOURCE = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [`${__dirname}/../../**/**.entity{.ts,.js}`],
  // subscribers: [`${__dirname}/../../**/**.subscriber{.ts,.js}`],
  migrations: [`${__dirname}/../../migrations/**.ts`],
  synchronize: false,
});
