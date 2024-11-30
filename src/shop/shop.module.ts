import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShopInjectionEnum } from './enums';
import { Product } from './entities';
import { ProductsService } from './services/products-service/products.service';
import { ProductsController } from './controller/products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [
    {
      provide: ShopInjectionEnum.PRODUCTS_SERVICE,
      useClass: ProductsService,
    },
  ],
})
export class ShopModule {}
