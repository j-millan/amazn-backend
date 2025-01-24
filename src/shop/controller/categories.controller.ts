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

import { ShopInjectionEnum } from '../enums';
import { CategoriesService } from '../services';
import { CategoryResponseDto } from '../dto';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(
    @Inject(ShopInjectionEnum.CATEGORIES_SERVICE)
    private _categoriesService: CategoriesService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all categories.' })
  @ApiOkResponse({
    description: 'OK',
    type: () => CategoryResponseDto,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No Content' })
  async getCategories(@Res() response: Response): Promise<Response> {
    const RESULT = await this._categoriesService.getAll();

    if (!RESULT.length) {
      return response.status(HttpStatus.NO_CONTENT).send();
    }

    response.status(HttpStatus.OK).json(RESULT);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find category by ID.' })
  @ApiOkResponse({
    description: 'OK',
    type: () => CategoryResponseDto,
  })
  @ApiNotFoundResponse({ description: 'No Content' })
  async getCategory(
    @Res() response: Response,
    @Param('id') id: number,
  ): Promise<Response> {
    const RESULT = await this._categoriesService.find(id);

    if (!RESULT) {
      return response.status(HttpStatus.NOT_FOUND).send();
    }

    response.status(HttpStatus.OK).json(RESULT);
  }
}
