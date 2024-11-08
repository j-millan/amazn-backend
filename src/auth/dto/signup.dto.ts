import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, Length } from 'class-validator';

export class SignupDto {
  @IsString()
  @Length(16, 32)
  @Type(() => String)
  @ApiProperty({
    name: 'password',
    description: 'The user password',
    type: String,
  })
  password: string;

  @IsString()
  @Length(2, 30)
  @Type(() => String)
  @ApiProperty({
    name: 'firstName',
    description: 'The user first name',
    type: String,
  })
  firstName: string;

  @IsString()
  @Length(2, 30)
  @Type(() => String)
  @ApiProperty({
    name: 'lastName',
    description: 'The user last name',
    type: String,
  })
  lastName: string;

  @IsString()
  @IsOptional()
  @Length(1, 254)
  @Type(() => String)
  @ApiProperty({
    name: 'email',
    description: 'The user email',
    type: String,
    required: false,
  })
  email?: string;

  @IsString()
  @IsOptional()
  @Length(15, 15)
  @Type(() => String)
  @ApiProperty({
    name: 'phoneNumber',
    description: 'The user phone number',
    type: String,
    required: false,
  })
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  @Length(5, 30)
  @Type(() => String)
  @ApiProperty({
    name: 'username',
    description: 'The user username',
    type: String,
    required: false,
  })
  username?: string;
}
