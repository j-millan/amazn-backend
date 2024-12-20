import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 100, unique: true })
  description: string;

  @Column('varchar', { nullable: true })
  slug: string;

  @Column('varchar')
  imageUrl: string;

  // Parent category will refer to its children as 'children'
  @ManyToOne(() => Category, (category) => category.children)
  parent: Category;

  // Children categories will refer to their parent as 'parent'
  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];
}
