import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import { Product } from '../entities';
import { InjectionEnum } from '../enums';
import { CreateProductDto } from '../dto';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(
    @Inject(InjectionEnum.PRODUCTS_SERVICE)
    private _productsService: ProductsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all prodcuts.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: () => Product,
    isArray: true,
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async getProducts(): Promise<Product[]> {
    return await this._productsService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
    type: () => Product,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async createProduct(@Body() data: CreateProductDto): Promise<Product> {
    return await this._productsService.create(data);
  }
}
