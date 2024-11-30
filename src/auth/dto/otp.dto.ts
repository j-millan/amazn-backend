import { ApiProperty } from '@nestjs/swagger';

export class GenerateOTPDto {
  @ApiProperty({
    name: 'email',
    description: 'The email to verify.',
    type: String,
  })
  email: string;
}

export class VerifyOTPDto extends GenerateOTPDto {
  @ApiProperty({
    name: 'otp',
    type: String,
  })
  otp: string;
}
