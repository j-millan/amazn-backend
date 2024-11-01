import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../entities';

export class CreateProductDto {
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
    type: String,
    description: 'The product generic category',
  })
  category: string;

  constructor(product: Product) {
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.category = 'n/a';
  }
}
