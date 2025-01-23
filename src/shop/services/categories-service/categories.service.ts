import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoriesServiceInterface } from '..';
import { Category } from '../../entities';

@Injectable()
export class CategoriesService implements CategoriesServiceInterface {
  constructor(
    @InjectRepository(Category) private _categoriesRepo: Repository<Category>,
  ) {}

  async getAll(): Promise<Category[]> {
    return await this._categoriesRepo.find();
  }

  async find(slug?: string, id?: number): Promise<Category> {
    if (slug) {
      return await this._categoriesRepo.findOneOrFail({
        where: { slug },
      });
    }

    if (id) {
      return await this._categoriesRepo.findOneOrFail({
        where: { id },
      });
    }
  }
}
