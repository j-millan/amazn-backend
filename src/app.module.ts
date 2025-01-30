import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './shop/shop.module';
import TYPE_ORM_CONFIG from './core/config/typeorm';
import MAILER_CONFIG from './core/config/mailer';
import ADMINJS_CONFIG from './core/config/adminjs';

const CONFIG_MODULE = ConfigModule.forRoot({
  envFilePath: '.env',
  isGlobal: true,
});

@Module({
  imports: [
    CONFIG_MODULE,
    TYPE_ORM_CONFIG,
    MAILER_CONFIG,
    ADMINJS_CONFIG,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      renderPath: '/static',
    }),
    ScheduleModule.forRoot(),
    ShopModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
