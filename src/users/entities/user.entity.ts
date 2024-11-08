import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  password: string;

  @Column('varchar', { length: 30 })
  firstName: string;

  @Column('varchar', { length: 30 })
  lastName: string;

  @Column('varchar', { length: 254, unique: true, nullable: true })
  email?: string;

  @Column('varchar', { length: 15, unique: true, nullable: true })
  phoneNumber?: string;

  @Column('varchar', { length: 30, nullable: true })
  username?: string;
}
