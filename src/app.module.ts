import { Module } from '@nestjs/common';
import { ShopModule } from './shop/shop.module';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm';
import { AuthModule } from './auth/auth.module';

const configModule = ConfigModule.forRoot({
  envFilePath: '.env.local',
});

@Module({
  imports: [configModule, typeOrmConfig, ShopModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
