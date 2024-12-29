import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import slugify from 'slugify';

import { ProductsServiceInterface } from './products-service.service.interface';
import { CreateProductDto } from '../../dto';
import { Category, Product } from '../../entities';
import { throwHttpException } from 'src/core';

@Injectable()
export class ProductsService implements ProductsServiceInterface {
  constructor(
    @InjectRepository(Product) private _productsRepo: Repository<Product>,
    @InjectRepository(Product) private _categoriesRepo: Repository<Category>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this._productsRepo.find();
  }

  async find(id: number): Promise<Product> {
    const PRODUCT = await this._productsRepo.findOneOrFail({
      where: { id },
    });

    return PRODUCT;
  }

  async create(data: CreateProductDto): Promise<Product> {
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
    return PRODUCT;
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
