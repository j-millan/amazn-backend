import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import slugify from 'slugify';

import { throwHttpException } from 'src/core';
import { ProductsServiceInterface } from '..';
import {
  CreateProductDto,
  ProductParamsDto,
  ProductResponseDto,
} from '../../dto';
import { Category, Product } from '../../entities';

@Injectable()
export class ProductsService implements ProductsServiceInterface {
  constructor(
    @InjectRepository(Product) private _productsRepo: Repository<Product>,
    @InjectRepository(Category) private _categoriesRepo: Repository<Category>,
  ) {}

  async getAll(queryParams: ProductParamsDto): Promise<ProductResponseDto[]> {
    const STOCK = queryParams?.stock === true ? 1 : 0;

    return (
      await this._productsRepo.find({
        where: {
          stock: MoreThanOrEqual(STOCK),
          category: { id: queryParams?.category },
        },
        relations: ['category.parent'],
      })
    ).map((product) => new ProductResponseDto(product));
  }

  async find(id: number): Promise<ProductResponseDto> {
    const PRODUCT = await this._productsRepo.findOneOrFail({
      where: { id },
      relations: ['category'],
    });

    return new ProductResponseDto(PRODUCT);
  }

  async create(data: CreateProductDto): Promise<ProductResponseDto> {
    const CATEGORY = await this._categoriesRepo.findOne({
      where: { id: data.categoryId },
    });

    if (!CATEGORY) {
      throwHttpException(
        HttpStatus.BAD_REQUEST,
        `the category with id ${data.categoryId} does not exist`,
      );
    }

    const PRODUCT = await this._productsRepo.save(
      this._productsRepo.create({
        ...data,
        category: CATEGORY,
      }),
    );

    this._setSlug(PRODUCT);
    return new ProductResponseDto(PRODUCT);
  }

  async delete(id: number): Promise<void> {
    await this._productsRepo.delete(id);
  }

  private _setSlug(product: Product): void {
    product.slug =
      slugify(product.name, { lower: true }) + '-' + product.id.toString();
    this._productsRepo.update(product.id, product);
  }
}
