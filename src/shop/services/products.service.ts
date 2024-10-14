import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private readonly _PRODUCTS: any[] = [
    { id: 1, description: 'Product 1' },
    { id: 2, description: 'Product 2' },
    { id: 3, description: 'Product 3' },
    { id: 4, description: 'Product 4' },
  ];

  async getAll(): Promise<any[]> {
    return this._PRODUCTS;
  }

  async find(id: number): Promise<any> {
    return this._PRODUCTS.find((product) => product.id === id);
  }

  async create(data: any): Promise<void> {
    this._PRODUCTS.push(data);
  }

  async delete(id: number): Promise<void> {
    const index = this._PRODUCTS.findIndex((product) => product.id === id);

    if (index >= 0) {
      this._PRODUCTS.splice(index, 1);
    }
  }
}
