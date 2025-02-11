import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, MoreThanOrEqual, Repository } from 'typeorm';
import slugify from 'slugify';

import { throwHttpException } from 'src/core';
import { BaseShopService } from '../base-shop.service';
import { ProductsServiceInterface } from './products-service.interface';
import {
  CreateProductDto,
  ProductParamsDto,
  ProductResponseDto,
  ProductsResponseDto,
} from '../../dto';
import { Category, Product } from '../../entities';
import { PRODUCTS } from 'src/shop/data/products';

@Injectable()
export class ProductsService
  extends BaseShopService
  implements ProductsServiceInterface
{
  constructor(
    @InjectRepository(Product) private _productsRepo: Repository<Product>,
    @InjectRepository(Category) private _categoriesRepo: Repository<Category>,
  ) {
    super();
  }

  async getAll(params: ProductParamsDto): Promise<ProductsResponseDto> {
    const STOCK = params?.stock === true ? 1 : 0;
    const WHERE: FindOptionsWhere<Product> = {
      stock: MoreThanOrEqual(STOCK),
      category: { id: params?.category },
    };

    const TOTAL_COUNT = await this._productsRepo.count({ where: WHERE });
    const RESULTS = (
      await this._productsRepo.find({
        where: WHERE,
        relations: ['category.parent'],
        ...this.getPaginationParams(params),
      })
    ).map((product) => new ProductResponseDto(product));

    return new ProductsResponseDto(
      RESULTS,
      TOTAL_COUNT,
      params.pageSize,
      params.pageNumber,
    );
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

  async init(): Promise<void> {
    this._productsRepo.clear();
    await this._productsRepo.query(
      'ALTER SEQUENCE product_id_seq RESTART WITH 1',
    );

    for (const product of PRODUCTS) {
      console.debug('product:', product);
      await this.create(product);
    }
  }

  private _setSlug(product: Product): void {
    product.slug = slugify(product.name, { lower: true });
    this._productsRepo.update(product.id, product);
  }
}
