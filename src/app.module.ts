import { Module } from '@nestjs/common';
import { ShopModule } from './shop/shop.module';
import { ConfigModule } from '@nestjs/config';
import { TYPE_ORM_CONFIG } from './common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

const configModule = ConfigModule.forRoot({
  envFilePath: '.env.local',
});

@Module({
  imports: [configModule, TYPE_ORM_CONFIG, ShopModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
