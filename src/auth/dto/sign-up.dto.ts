import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { IsPasswordValid } from '../validators';

export class SignUpDto {
  @Type(() => String)
  @IsString()
  @IsEmail()
  @Length(1, 254)
  @ApiProperty({
    name: 'email',
    description: 'The user email',
    type: String,
  })
  email: string;

  @Type(() => String)
  @IsPasswordValid()
  @IsString()
  @ApiProperty({
    name: 'password',
    description: 'The user password',
    type: String,
  })
  password: string;

  @Type(() => String)
  @IsString()
  @Length(2, 30)
  @ApiProperty({
    name: 'name',
    description: 'The user first and last name',
    type: String,
  })
  name: string;

  @Type(() => String)
  @IsString()
  @IsOptional()
  @Length(5, 30)
  @ApiProperty({
    name: 'username',
    description: 'The user username',
    type: String,
    required: false,
  })
  username?: string;
}
