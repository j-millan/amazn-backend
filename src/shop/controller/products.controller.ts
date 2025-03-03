import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
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

import { HttpErrorDto, InjectionEnum } from 'src/core';
import { ProductsServiceInterface } from '../services';
import {
  CreateProductDto,
  ProductParamsDto,
  ProductResponseDto,
  ProductsResponseDto,
} from '../dto';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(
    @Inject(InjectionEnum.PRODUCTS_SERVICE)
    private _productsService: ProductsServiceInterface,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all prodcuts.' })
  @ApiOkResponse({
    description: 'OK',
    type: () => ProductsResponseDto,
  })
  @ApiNoContentResponse({ description: 'No Content' })
  async getProducts(
    @Res({ passthrough: true }) response: Response,
    @Query() queryParams: ProductParamsDto,
  ): Promise<ProductsResponseDto> {
    const RESULT = await this._productsService.getAll(queryParams);

    if (!RESULT.results?.length) {
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

  @Post('init')
  @ApiOperation({ summary: 'Initialize products.' })
  @ApiCreatedResponse({ description: 'Created' })
  async initCategories(): Promise<void> {
    return await this._productsService.init();
  }
}
