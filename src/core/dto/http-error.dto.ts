import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpErrorDto {
  @ApiProperty({
    name: 'statusCode',
    type: Number,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    name: 'message',
    type: String,
  })
  message: string;

  @ApiProperty({
    name: 'error',
    type: String,
    isArray: true,
    required: false,
  })
  error?: string[];

  constructor(
    statusCode: HttpStatus,
    message: string,
    error?: string | string[],
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error ? [].concat(error) : [];
  }
}
