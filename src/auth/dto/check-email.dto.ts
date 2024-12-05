import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CheckEmailDto {
  @IsEmail()
  @ApiProperty({
    name: 'email',
    description: 'The email to check.',
    type: String,
  })
  email: string;
}
