import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InjectionEnum } from 'src/core';
import { Category, Product } from './entities';
import { CategoriesService, ProductsService } from './services';
import { CategoriesController, ProductsController } from './controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [ProductsController, CategoriesController],
  providers: [
    {
      provide: InjectionEnum.PRODUCTS_SERVICE,
      useClass: ProductsService,
    },
    {
      provide: InjectionEnum.CATEGORIES_SERVICE,
      useClass: CategoriesService,
    },
  ],
})
export class ShopModule {}
