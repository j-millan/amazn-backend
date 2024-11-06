import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ name: 'id', description: 'The user id', type: String })
  id: string;

  @Column('varchar', { unique: true, length: 254 })
  @ApiProperty({ name: 'email', description: 'The user email.', type: String })
  email: string;

  @Column('varchar', { length: 255 })
  @ApiProperty({
    name: 'password',
    description: 'The user password',
    type: String,
  })
  password: string;

  @Column('varchar', { length: 35 })
  @ApiProperty({
    name: 'username',
    description: 'The user username',
    type: String,
  })
  username: string;

  @Column('varchar', { length: 30 })
  @ApiProperty({
    name: 'firstName',
    description: 'The user first name',
    type: String,
  })
  firstName: string;

  @Column('varchar', { length: 30 })
  @ApiProperty({
    name: 'lastName',
    description: 'The user last name',
    type: String,
  })
  lastName: string;

  @Column('varchar', { length: 15 })
  @ApiProperty({
    name: 'phoneNumber',
    description: 'The user phone number',
    type: String,
  })
  phoneNumber: string;
}
