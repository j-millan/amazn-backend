import { ApiProperty } from '@nestjs/swagger';
import { ProductInterface } from '../interfaces';

export class ProductDto implements ProductInterface {
  @ApiProperty({ name: 'id', type: Number, description: 'The product id' })
  id: number;

  @ApiProperty({ name: 'name', type: String, description: 'The product name' })
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
    type: Number,
    description: 'The product generic category',
  })
  category: string;

  @ApiProperty({
    name: 'images',
    type: Object,
    isArray: true,
    description: 'Sample images for the product',
  })
  images: [];

  @ApiProperty({
    name: 'reviews',
    type: Object,
    isArray: true,
    description: 'The user reviews of the product',
  })
  reviews: [];

  @ApiProperty({
    name: 'createdAt',
    type: String,
    description: 'The date the product was created',
  })
  createdAt: string;

  @ApiProperty({
    name: 'updatedAt',
    type: String,
    description: 'The date the product was last updated',
  })
  updatedAt: string;

  constructor(product: ProductInterface) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.category = product.category;
    this.images = product.images;
    this.reviews = product.reviews;
  }
}
