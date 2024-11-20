import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance, Type } from 'class-transformer';
import { IsString } from 'class-validator';
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
  @ApiProperty({
    name: 'email',
    description: 'The user email or phone number',
    type: String,
  })
  email: string;
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
