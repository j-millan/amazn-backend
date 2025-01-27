import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { CategoryResponseDto } from './category.dto';
import { Product } from '../entities';

export class ProductResponseDto {
  @ApiProperty({ name: 'id', type: Number, description: "The product's id." })
  id: number;

  @ApiProperty({
    name: 'slug',
    type: String,
    description: 'User-friendly identifier for the product.',
  })
  slug: string;

  @ApiProperty({
    name: 'name',
    type: String,
    description: "The product's name.",
  })
  name: string;

  @ApiProperty({
    name: 'description',
    type: String,
    description: "The product's description.",
  })
  description: string;

  @ApiProperty({
    name: 'price',
    type: Number,
    description: "The product's price, in U$D.",
  })
  price: number;

  @ApiProperty({
    name: 'stock',
    type: Boolean,
    description: 'Indicates wether the product is in stock.',
  })
  stock: boolean;

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
    this.stock = product.stock >= 1;
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
  @ApiProperty({
    name: 'name',
    type: String,
    description: "The product's name.",
  })
  name: string;

  @Type(() => String)
  @IsString()
  @Length(50, 350)
  @ApiProperty({
    name: 'description',
    type: String,
    description: "The product's description.",
  })
  description: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0.001)
  @ApiProperty({
    name: 'price',
    type: Number,
    description: "The product's price, in U$D.",
  })
  price: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty({
    name: 'stock',
    type: Number,
    description: 'The number of products in stock.',
  })
  stock: number;

  @Type(() => Number)
  @IsInt()
  @ApiProperty({
    name: 'categoryId',
    type: Number,
    description: 'The id of the category to be associated to the product.',
  })
  categoryId: number;
}

export class ProductParamsDto {
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    name: 'stock',
    description: 'Wether the product should be in stock or not.',
    type: Boolean,
    required: false,
  })
  stock?: boolean;
}
