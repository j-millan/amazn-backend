import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('closure-table')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 100 })
  description: string;

  @Column('varchar', { nullable: true })
  slug: string;

  @Column('varchar')
  imageUrl: string;

  // Parent category will refer to its children as 'children'
  @TreeParent()
  parent?: Category;

  // Child categories will refer to their parent as 'parent'
  @TreeChildren({ cascade: true })
  children?: Category[];
}
