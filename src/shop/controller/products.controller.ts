import { Controller, Get } from '@nestjs/common';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private _productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<any[]> {
    return await this._productsService.getAll();
  }
}
