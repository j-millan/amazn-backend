import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import { ProductDto } from '../dto';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private _productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all prodcuts.' })
  @ApiResponse({ status: HttpStatus.OK, type: () => ProductDto })
  async getProducts(): Promise<ProductDto[]> {
    return await this._productsService.getAll();
  }
}
