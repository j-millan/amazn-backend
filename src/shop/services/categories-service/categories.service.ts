import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoriesServiceInterface } from '..';
import { Category } from '../../entities';
import { CategoryResponseDto } from 'src/shop/dto';

@Injectable()
export class CategoriesService implements CategoriesServiceInterface {
  constructor(
    @InjectRepository(Category) private _categoriesRepo: Repository<Category>,
  ) {}

  async getAll(): Promise<CategoryResponseDto[]> {
    const CATEGORIES = (await this._categoriesRepo.find()).map(
      (category) => new CategoryResponseDto(category),
    );
    return CATEGORIES;
  }

  async find(id: number): Promise<CategoryResponseDto> {
    const CATEGORY = await this._categoriesRepo.findOneOrFail({
      where: { id },
    });

    return new CategoryResponseDto(CATEGORY);
  }
}
