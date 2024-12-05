import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
  @ApiProperty({
    name: 'message',
    type: String,
  })
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
