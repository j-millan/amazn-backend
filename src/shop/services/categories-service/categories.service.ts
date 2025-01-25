import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoriesServiceInterface } from '..';
import { Category } from '../../entities';
import { CategoryResponseDto, CreateCategoryDto } from 'src/shop/dto';
import { throwHttpException } from 'src/core';

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
    try {
      const CATEGORY = await this._categoriesRepo.findOneOrFail({
        where: { id },
        relations: ['parent'],
      });

      return new CategoryResponseDto(CATEGORY);
    } catch (error) {
      console.debug(error);
      throwHttpException(
        HttpStatus.NOT_FOUND,
        `the category with id ${id} does not exist`,
      );
    }
  }

  async create({
    description,
    imageUrl,
    parentId,
  }: CreateCategoryDto): Promise<CategoryResponseDto> {
    const PARENT = await this._categoriesRepo.findOne({
      where: { id: parentId },
    });

    if (!PARENT) {
      throwHttpException(
        HttpStatus.BAD_REQUEST,
        `the category with id ${parentId} does not exist`,
      );
    }

    const CATEGORY = await this._categoriesRepo.save(
      this._categoriesRepo.create({
        description,
        imageUrl,
        parent: PARENT,
      }),
    );

    return CATEGORY;
  }
}
