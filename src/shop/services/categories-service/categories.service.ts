import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

import { throwHttpException } from 'src/core';
import { CategoriesServiceInterface } from './categories-service.interface';
import { Category } from '../../entities';
import { CategoryResponseDto } from '../../dto';

@Injectable()
export class CategoriesService implements CategoriesServiceInterface {
  constructor(
    @InjectRepository(Category) private _categoriesRepo: Repository<Category>,
    private _configService: ConfigService,
  ) {}

  async getAll(): Promise<CategoryResponseDto[]> {
    const CATEGORIES = (
      await this._categoriesRepo.manager.getTreeRepository(Category).findTrees()
    ).map((cat) => new CategoryResponseDto(cat, this._getImageBaseUrl()));

    return CATEGORIES;
  }

  async find(id: number): Promise<CategoryResponseDto> {
    try {
      const CATEGORY = await this._categoriesRepo.findOneOrFail({
        where: { id },
        relations: ['parent', 'children'],
      });

      return new CategoryResponseDto(CATEGORY, this._getImageBaseUrl());
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

  async init(categories: any[]): Promise<void> {
    await this._categoriesRepo.clear();
    await this._categoriesRepo.query(
      'ALTER SEQUENCE category_id_seq RESTART WITH 1',
    );

    this._createCategories(categories);
  }

  private async _createCategories(
    categories: any[],
    parentId?: number,
  ): Promise<void> {
    for (let i = 0; i < categories.length; i++) {
      const { description, imageUrl, subcategories } = categories[i];
      const { id } = await this.create({ description, imageUrl, parentId });

      if (subcategories?.length) {
        await this._createCategories(subcategories, id);
      }
    }
  }

  private _getImageBaseUrl(): string {
    const DOMAIN = this._configService.get('APP_DOMAIN');
    const PORT = this._configService.get('APP_PORT');
    const STATIC_PATH = this._configService.get('APP_STATIC_PATH');

    return `${DOMAIN}:${PORT}${STATIC_PATH}`;
  }
}
