import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './shop/shop.module';
import {
  ADMINJS_CONFIG,
  MAILER_CONFIG,
  SERVE_STATIC_MODULE,
  TYPE_ORM_CONFIG,
} from './core';

const CONFIG_MODULE = ConfigModule.forRoot({
  isGlobal: true,
});

@Module({
  imports: [
    CONFIG_MODULE,
    SERVE_STATIC_MODULE,
    TYPE_ORM_CONFIG,
    MAILER_CONFIG,
    ADMINJS_CONFIG,
    ScheduleModule.forRoot(),
    ShopModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
