import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, Length, Min } from 'class-validator';

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

  @Type(() => String)
  @IsString()
  @ApiProperty({
    name: 'category',
    type: String,
    description: 'The product generic category',
  })
  category: string;
}
