import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Category } from './category.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { nullable: true })
  slug: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('varchar', { length: 350 })
  description: string;

  @Column('float')
  price: number;

  @Column('integer', { default: 1 })
  stock: number;

  @ManyToOne(() => Category)
  category: Category;

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
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
