import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities';
import { Repository } from 'typeorm';
import slugify from 'slugify';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private _productsRepository: Repository<Product>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this._productsRepository.find();
  }

  async find(id: number): Promise<Product> {
    const PRODUCT = await this._productsRepository.findOneOrFail({
      where: { id },
    });

    return PRODUCT;
  }

  async create(data: CreateProductDto): Promise<Product> {
    const PRODUCT = await this._productsRepository.save(
      await this._productsRepository.create(data),
    );

    this._generateSlug(PRODUCT);
    return PRODUCT;
  }

  async delete(id: number): Promise<void> {
    await this._productsRepository.delete(id);
  }

  private _generateSlug(product: Product): void {
    product.slug =
      slugify(product.name, { lower: true }) + '-' + product.id.toString();
    this._productsRepository.update(product.id, product);
  }
}
