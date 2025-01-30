import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, IsNull, Repository } from 'typeorm';
import slugify from 'slugify';

import { throwHttpException } from 'src/core';
import { Category } from '../../entities';
import { CategoriesServiceInterface } from '..';
import { CategoryResponseDto, CreateCategoryDto } from '../../dto';

@Injectable()
export class CategoriesService implements CategoriesServiceInterface {
  constructor(
    @InjectRepository(Category) private _categoriesRepo: Repository<Category>,
  ) {}

  async getAll(): Promise<CategoryResponseDto[]> {
    const CATEGORIES = (
      await this._categoriesRepo.find({
        where: {
          parent: IsNull(),
        },
        relations: ['children'],
      })
    ).map((category) => new CategoryResponseDto(category));

    return CATEGORIES;
  }

  async find(id: number): Promise<CategoryResponseDto> {
    try {
      const CATEGORY = await this._categoriesRepo.findOneOrFail({
        where: { id },
        relations: ['parent', 'children'],
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
      where: { id: Equal(parentId) },
    });

    if (parentId && !PARENT) {
      throwHttpException(
        HttpStatus.BAD_REQUEST,
        `the category with id ${parentId} does not exist`,
      );
    }

    const SLUG = slugify(description, { lower: true });

    const CATEGORY = await this._categoriesRepo.save(
      this._categoriesRepo.create({
        description,
        imageUrl,
        slug: SLUG,
        parent: PARENT,
      }),
    );

    return CATEGORY;
  }

  async init(categories: any[], parentId?: number): Promise<void> {
    for (let i = 0; i < categories.length; i++) {
      const { description, imageUrl, subcategories } = categories[i];
      const { id } = await this.create({ description, imageUrl, parentId });

      if (subcategories?.length) {
        await this.init(subcategories, id);
      }
    }
  }
}
