import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationParamsDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    name: 'pageSize',
    description: 'The number of results per page.',
    type: Number,
    required: false,
    default: 25,
  })
  pageSize?: number = 25;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    name: 'pageNumber',
    description: 'The page number.',
    type: Number,
    required: false,
    default: 1,
  })
  pageNumber?: number = 1;
}

export class PaginatedResponseDto {
  @ApiProperty({
    name: 'total',
    description: 'The total number of results.',
    type: Number,
  })
  totalResults: number;

  @ApiProperty({
    name: 'pageSize',
    description: 'The number of results per page.',
    type: Number,
  })
  pageSize: number;

  @ApiProperty({
    name: 'currentPage',
    description: 'The current page.',
    type: Number,
  })
  currentPage: number;

  @ApiProperty({
    name: 'previousPage',
    description: 'The previous page.',
    type: Number,
  })
  previousPage: number;

  @ApiProperty({
    name: 'nextPage',
    description: 'The next page.',
    type: Number,
  })
  nextPage: number;

  @ApiProperty({
    name: 'totalPages',
    description: 'The total number of pages.',
    type: Number,
  })
  totalPages: number;

  constructor(totalResults: number, pageSize: number, currentPage: number) {
    this.totalResults = totalResults;
    this.pageSize = pageSize;
    this.currentPage = currentPage;
    this.previousPage = currentPage === 1 ? null : currentPage - 1;
    this.totalPages = Math.ceil(totalResults / pageSize);
    this.nextPage = currentPage === this.totalPages ? null : currentPage + 1;
  }
}
