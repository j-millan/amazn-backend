import { join } from 'path';
import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '**', '*.entity.ts')],
  migrations: [join(__dirname, 'migrations/**', '*.ts')],
  synchronize: false,
});
