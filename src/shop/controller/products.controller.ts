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
import { ShopInjectionEnum } from '../enums';
import { ProductsService } from '../services';
import { CreateProductDto, ProductResponseDto } from '../dto';

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
    type: () => ProductResponseDto,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No Content' })
  async getProducts(
    @Res({ passthrough: true }) response: Response,
  ): Promise<ProductResponseDto[]> {
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
    type: () => ProductResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async getProduct(@Param('id') id: number): Promise<ProductResponseDto> {
    return await this._productsService.find(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product.' })
  @ApiCreatedResponse({
    description: 'Created',
    type: () => ProductResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: HttpErrorDto,
  })
  async createProduct(
    @Body() data: CreateProductDto,
  ): Promise<ProductResponseDto> {
    return await this._productsService.create(data);
  }
}
