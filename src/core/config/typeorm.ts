import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const TYPE_ORM_CONFIG = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [`${__dirname}/../../**/**.entity{.ts,.js}`],
    // subscribers: [`${__dirname}/../../**/**.subscriber{.ts,.js}`],
    migrations: [`${__dirname}/../../migrations/**.ts`],
    synchronize: false,
  }),
});
