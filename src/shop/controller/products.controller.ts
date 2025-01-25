import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

import { HttpErrorDto } from 'src/core';
import { ProductsService } from '../services/products-service/products.service';
import { Product } from '../entities';
import { ShopInjectionEnum } from '../enums';
import { CreateProductDto } from '../dto';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(
    @Inject(ShopInjectionEnum.PRODUCTS_SERVICE)
    private _productsService: ProductsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all prodcuts.' })
  @ApiOkResponse({
    description: 'OK',
    type: () => Product,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No Content' })
  async getProducts(
    @Res({ passthrough: true }) response: Response,
  ): Promise<Product[]> {
    const RESULT = await this._productsService.getAll();

    if (!RESULT.length) {
      response.status(HttpStatus.NO_CONTENT);
      return;
    }

    return RESULT;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a product by its id.' })
  @ApiOkResponse({
    description: 'OK',
    type: () => Product,
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async getProduct(@Param('id') id: number): Promise<Product> {
    return await this._productsService.find(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product.' })
  @ApiCreatedResponse({
    description: 'Created',
    type: () => Product,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: HttpErrorDto,
  })
  async createProduct(@Body() data: CreateProductDto): Promise<Product> {
    return await this._productsService.create(data);
  }
}
