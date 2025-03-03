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

  private _getImageBaseUrl(): string {
    const DOMAIN = this._configService.get('APP_DOMAIN');
    const PORT = this._configService.get('APP_PORT');
    const STATIC_PATH = this._configService.get('APP_STATIC_PATH');

    return `${DOMAIN}:${PORT}${STATIC_PATH}`;
  }
}
