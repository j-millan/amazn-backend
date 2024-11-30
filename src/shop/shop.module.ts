import { Module } from '@nestjs/common';
import { ProductsController } from './controller/products.controller';
import { ProductsService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities';
import { ShopInjectionEnum } from './enums';

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
