import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../entities';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CategoryResponseDto {
  @ApiProperty({
    name: 'id',
    description: "The category's ID.",
    type: Number,
  })
  id: number;

  @ApiProperty({
    name: 'description',
    description: "The category's description.",
    type: String,
  })
  description: string;

  @ApiProperty({
    name: 'slug',
    description: 'User-friendly identifier for the category.',
    type: String,
  })
  slug: string;

  @ApiProperty({
    name: 'imageUrl',
    description: 'URL of the thumbnail of the category.',
    type: String,
  })
  imageUrl: string;

  @ApiProperty({
    name: 'parent',
    description: 'The parent category.',
    type: () => CategoryResponseDto,
    required: false,
  })
  parent?: CategoryResponseDto;

  @ApiProperty({
    name: 'children',
    description: 'The child categories.',
    type: () => CategoryResponseDto,
    isArray: true,
    required: false,
  })
  children?: CategoryResponseDto[];

  constructor(category: Category) {
    this.id = category.id;
    this.description = category.description;
    this.slug = category.slug;
    this.imageUrl = category.imageUrl;

    if (category.parent) {
      category.parent.children = null;
      this.parent = new CategoryResponseDto(category.parent);
    }

    if (category.children) {
      this.children = category.children.map((child) => {
        child.parent = null;
        return new CategoryResponseDto(child);
      });
    }
  }
}

export class CreateCategoryDto {
  @Type(() => String)
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    name: 'description',
    description: "The category's description.",
    type: String,
  })
  description: string;

  @Type(() => String)
  @IsString()
  @ApiProperty({
    name: 'imageUrl',
    description: 'URL of the thumbnail of the category.',
    type: String,
  })
  imageUrl: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @ApiProperty({
    name: 'parentId',
    description: 'The ID of the parent category.',
    type: Number,
    required: false,
  })
  parentId?: number;
}
