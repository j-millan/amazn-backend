import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumberString, Length } from 'class-validator';

export class GenerateOTPDto {
  @IsEmail()
  @ApiProperty({
    name: 'email',
    description: 'The email to verify.',
    type: String,
  })
  email: string;
}

export class VerifyOTPDto extends GenerateOTPDto {
  @IsNumberString()
  @Length(6)
  @ApiProperty({
    name: 'otp',
    type: String,
  })
  otp: string;
}
