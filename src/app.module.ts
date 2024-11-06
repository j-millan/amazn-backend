import { Module } from '@nestjs/common';
import { ShopModule } from './shop/shop.module';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

const configModule = ConfigModule.forRoot({
  envFilePath: '.env.local',
});

@Module({
  imports: [configModule, typeOrmConfig, ShopModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
