import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance, Type } from 'class-transformer';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { UserResponseDto } from './user.dto';
import { User } from 'src/users/entities';

export class SignInDto {
  @Type(() => String)
  @IsString()
  @ApiProperty({
    name: 'password',
    description: 'The user password',
    type: String,
  })
  password: string;

  @Type(() => String)
  @IsString()
  @IsEmail()
  @IsOptional()
  @Length(1, 254)
  @ApiProperty({
    name: 'email',
    description: 'The user email',
    type: String,
    required: false,
  })
  email?: string;

  @Type(() => String)
  @IsString()
  @IsOptional()
  @Length(10, 20)
  @ApiProperty({
    name: 'phoneNumber',
    description: 'The user phone number',
    type: String,
    required: false,
  })
  phoneNumber?: string;
}

export class SignInResponseDto {
  @ApiProperty({
    name: 'token',
    type: String,
  })
  token: string;

  @Type(() => UserResponseDto)
  @ApiProperty({
    name: 'user',
    type: () => UserResponseDto,
  })
  user: UserResponseDto;

  constructor(token: string, user: User) {
    this.token = token;
    this.user = plainToInstance(UserResponseDto, user);
  }
}
