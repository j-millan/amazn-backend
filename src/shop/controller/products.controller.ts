import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  async getProducts(): Promise<any[]> {
    return [
      { id: 1, description: 'Product 1' },
      { id: 2, description: 'Product 2' },
      { id: 3, description: 'Product 3' },
      { id: 4, description: 'Product 4' },
    ];
  }
}
