import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance, Type } from 'class-transformer';
import { IsOptional, IsString, Length } from 'class-validator';
import { UserResponseDto } from './user.dto';
import { User } from 'src/users/entities';

export class SignInDto {
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
  @Length(10, 20)
  @Type(() => String)
  @ApiProperty({
    name: 'phoneNumber',
    description: 'The user phone number',
    type: String,
    required: false,
  })
  phoneNumber?: string;
}

export class SignUpDto extends SignInDto {
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
