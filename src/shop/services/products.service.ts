import { Injectable } from '@nestjs/common';
import { ProductInterface } from '../interfaces';
import { PRODUCTS_DATA } from '../data/products';

@Injectable()
export class ProductsService {
  private readonly _PRODUCTS: ProductInterface[] = PRODUCTS_DATA;

  async getAll(): Promise<ProductInterface[]> {
    return this._PRODUCTS;
  }

  async find(id: number): Promise<ProductInterface> {
    return this._PRODUCTS.find((product) => product.id === id);
  }

  async create(data: ProductInterface): Promise<void> {
    this._PRODUCTS.push(data);
  }

  async delete(id: number): Promise<void> {
    const index = this._PRODUCTS.findIndex((product) => product.id === id);

    if (index >= 0) {
      this._PRODUCTS.splice(index, 1);
    }
  }
}
