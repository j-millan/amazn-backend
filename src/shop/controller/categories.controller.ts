import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Res,
} from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

import { InjectionEnum } from 'src/core';
import { CategoriesServiceInterface } from '../services';
import { CategoryResponseDto } from '../dto';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(
    @Inject(InjectionEnum.CATEGORIES_SERVICE)
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
  @ApiOperation({ summary: 'Fetch a category by its id.' })
  @ApiOkResponse({
    description: 'OK',
    type: () => CategoryResponseDto,
  })
  @ApiNotFoundResponse({ description: 'No Content' })
  async getCategory(@Param('id') id: number): Promise<CategoryResponseDto> {
    const RESULT = await this._categoriesService.find(id);
    return RESULT;
  }
}
