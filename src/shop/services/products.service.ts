import { Injectable } from '@nestjs/common';
import { PRODUCTS_DATA } from '../data/products';
import { ProductInterface } from '../interfaces';
import { ProductDto } from '../dto';

@Injectable()
export class ProductsService {
  private readonly _PRODUCTS: ProductInterface[] = PRODUCTS_DATA;

  async getAll(): Promise<ProductDto[]> {
    return this._PRODUCTS.map((product) => new ProductDto(product));
  }

  async find(id: number): Promise<ProductDto> {
    const PRODUCT = this._PRODUCTS.find((product) => product.id === id);
    return new ProductDto(PRODUCT);
  }

  async create(data: ProductDto): Promise<void> {
    this._PRODUCTS.push(data);
  }

  async delete(id: number): Promise<void> {
    const index = this._PRODUCTS.findIndex((product) => product.id === id);

    if (index >= 0) {
      this._PRODUCTS.splice(index, 1);
    }
  }
}
