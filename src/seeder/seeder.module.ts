import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InjectionEnum } from 'src/core';
import { Category } from 'src/shop/entities';
import { CategoriesSeederService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [
    {
      provide: InjectionEnum.CATEGORIES_SEEDER_SERVICE,
      useClass: CategoriesSeederService,
    },
  ],
})
export class SeederModule {}
