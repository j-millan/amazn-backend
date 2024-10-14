import { Module } from '@nestjs/common';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [ShopModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
