import { Module } from '@nestjs/common';
import { ShopModule } from './shop/shop.module';
import { ConfigModule } from '@nestjs/config';
import { TYPE_ORM_CONFIG } from './core';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

const CONFIG_MODULE = ConfigModule.forRoot({
  envFilePath: '.env.local',
  isGlobal: true,
});

@Module({
  imports: [
    CONFIG_MODULE,
    TYPE_ORM_CONFIG,
    ShopModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
