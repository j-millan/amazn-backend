import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsString, Length, Min } from 'class-validator';
import { CategoryResponseDto } from './category.dto';
import { Product } from '../entities';

export class ProductResponseDto {
  @ApiProperty({ name: 'id', type: Number, description: 'The product id' })
  id: number;

  @ApiProperty({
    name: 'slug',
    type: String,
    description: 'Slug for identification.',
  })
  slug: string;

  @ApiProperty({
    name: 'name',
    type: String,
    description: 'The product name',
  })
  name: string;

  @ApiProperty({
    name: 'description',
    type: String,
    description: 'The product description',
  })
  description: string;

  @ApiProperty({
    name: 'price',
    type: Number,
    description: 'The product price, in U$D',
  })
  price: number;

  @ApiProperty({
    name: 'category',
    type: () => OmitType(CategoryResponseDto, ['parent', 'children']),
    description: 'The product generic category',
  })
  category: CategoryResponseDto;

  @ApiProperty({
    name: 'createdAt',
    type: String,
    description: 'The date at which the product was created',
  })
  createdAt: string;

  @ApiProperty({
    name: 'updatedAt',
    type: String,
    description: 'The date at which the product was last updated',
  })
  updatedAt: string;

  constructor(product: Product) {
    this.id = product.id;
    this.slug = product.slug;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;

    product.category.children = null;
    this.category = new CategoryResponseDto(product.category, true);
  }
}

export class CreateProductDto {
  @Type(() => String)
  @IsString()
  @Length(10, 100)
  @ApiProperty({ name: 'name', type: String, description: 'The product name' })
  name: string;

  @Type(() => String)
  @IsString()
  @Length(50, 350)
  @ApiProperty({
    name: 'description',
    type: String,
    description: 'The product description',
  })
  description: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0.001)
  @ApiProperty({
    name: 'price',
    type: Number,
    description: 'The product price, in U$D',
  })
  price: number;

  @Type(() => Number)
  @IsInt()
  @ApiProperty({
    name: 'categoryId',
    type: Number,
    description: 'The id of the category to be associated to the product',
  })
  categoryId: number;
}
