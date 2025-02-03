import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './shop/shop.module';
import {
  ADMINJS_CONFIG,
  MAILER_CONFIG,
  PaginationMiddleware,
  SERVE_STATIC_MODULE,
  TYPE_ORM_CONFIG,
} from './core';

const CONFIG_MODULE = ConfigModule.forRoot({
  envFilePath: '.env',
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PaginationMiddleware)
      .forRoutes({ path: 'products', method: RequestMethod.GET });
  }
}
