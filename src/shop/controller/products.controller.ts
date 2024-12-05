import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
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
  async getProducts(@Res() response: Response): Promise<Response> {
    const RESULT = await this._productsService.getAll();

    if (!RESULT.length) {
      return response.status(HttpStatus.NO_CONTENT).send();
    }

    response.status(HttpStatus.OK).json(RESULT);
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
