import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoriesSeederServiceInterface } from './categories-seeder.service.interface';
import { Category } from 'src/shop/entities';
import { CATEGORIES } from '../../data/categories';

@Injectable()
export class CategoriesSeederService
  implements CategoriesSeederServiceInterface
{
  constructor(
    @InjectRepository(Category) private _categoriesRepo: Repository<Category>,
  ) {}

  async run(): Promise<void> {
    console.debug('Seeding Category table...');
    const ROW_COUNT = await this._categoriesRepo.count();

    if (ROW_COUNT != 0) {
      console.debug('Category table already populated. Seeder skipped.');
      return;
    }

    await this._categoriesRepo.query(
      'ALTER SEQUENCE category_id_seq RESTART WITH 1',
    );

    await this._categoriesRepo.save(this._categoriesRepo.create(CATEGORIES));
    console.debug('Category table seeded successfully.');
  }
}
