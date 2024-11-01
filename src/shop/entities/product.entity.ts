import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ name: 'id', type: Number, description: "The product's id" })
  id: number;

  @Column('varchar', { nullable: true })
  @ApiProperty({
    name: 'slug',
    type: String,
    description: 'Slug for identification.',
  })
  slug: string;

  @Column('varchar', { length: 100 })
  @ApiProperty({
    name: 'name',
    type: String,
    description: "The product's name",
  })
  name: string;

  @Column('varchar', { length: 350 })
  @ApiProperty({
    name: 'description',
    type: String,
    description: "The product's description",
  })
  description: string;

  @Column('float')
  @ApiProperty({
    name: 'price',
    type: Number,
    description: "The product's price, in U$D",
  })
  price: number;

  @Column('varchar')
  @ApiProperty({
    name: 'category',
    type: Number,
    description: 'The product generic category',
  })
  category: string;

  // @ApiProperty({
  //   name: 'images',
  //   type: Object,
  //   isArray: true,
  //   description: 'Sample images for the product',
  // })
  // images: [];

  // @ApiProperty({
  //   name: 'reviews',
  //   type: Object,
  //   isArray: true,
  //   description: 'The user reviews of the product',
  // })
  // reviews: [];

  @CreateDateColumn()
  @ApiProperty({
    name: 'createdAt',
    type: String,
    description: 'The date at which the product was created',
  })
  createdAt: string;

  @UpdateDateColumn()
  @ApiProperty({
    name: 'updatedAt',
    type: String,
    description: 'The date at which the product was last updated',
  })
  updatedAt: string;
}
