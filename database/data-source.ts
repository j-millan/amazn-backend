import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/browser';
import { SeederOptions } from 'typeorm-extension';

const OPTIONS: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [`${__dirname}/../src/**/**.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/**.ts`],
  synchronize: false,
  seeds: [`${__dirname}/seeds/**.ts`],
};

export const CONNECTION_SOURCE = new DataSource(OPTIONS);
