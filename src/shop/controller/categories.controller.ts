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

import { ShopInjectionEnum } from '../enums';
import { CategoriesServiceInterface } from '../services';
import { CategoryResponseDto, CreateCategoryDto } from '../dto';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(
    @Inject(ShopInjectionEnum.CATEGORIES_SERVICE)
    private _categoriesService: CategoriesServiceInterface,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all categories.' })
  @ApiOkResponse({
    description: 'OK',
    type: () => CategoryResponseDto,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No Content' })
  async getCategories(
    @Res({ passthrough: true }) response: Response,
  ): Promise<CategoryResponseDto[]> {
    const RESULT = await this._categoriesService.getAll();

    if (!RESULT.length) {
      response.status(HttpStatus.NO_CONTENT);
      return;
    }

    return RESULT;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find category by ID.' })
  @ApiOkResponse({
    description: 'OK',
    type: () => CategoryResponseDto,
  })
  @ApiNotFoundResponse({ description: 'No Content' })
  async getCategory(@Param('id') id: number): Promise<CategoryResponseDto> {
    const RESULT = await this._categoriesService.find(id);
    return RESULT;
  }

  @Post()
  @ApiOperation({ summary: 'Create a category.' })
  @ApiCreatedResponse({ type: CategoryResponseDto })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createCategory(
    @Body() data: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    return await this._categoriesService.create(data);
  }
}
