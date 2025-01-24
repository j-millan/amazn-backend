import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShopInjectionEnum } from './enums';
import { Category, Product } from './entities';
import { CategoriesService, ProductsService } from './services';
import { CategoriesController, ProductsController } from './controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [ProductsController, CategoriesController],
  providers: [
    {
      provide: ShopInjectionEnum.PRODUCTS_SERVICE,
      useClass: ProductsService,
    },
    {
      provide: ShopInjectionEnum.CATEGORIES_SERVICE,
      useClass: CategoriesService,
    },
  ],
})
export class ShopModule {}
