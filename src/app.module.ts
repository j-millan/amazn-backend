import { Module } from '@nestjs/common';
import { ShopModule } from './shop/shop.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

const configModule = ConfigModule.forRoot({
  envFilePath: '.env.local',
});

@Module({
  imports: [configModule, typeOrmModule, ShopModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
