import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpErrorDto {
  @ApiProperty({
    name: 'statusCode',
    type: Number,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    name: 'error',
    type: String,
  })
  error: string;

  @ApiProperty({
    name: 'message',
    type: String,
    isArray: true,
    required: false,
  })
  message?: string[];

  constructor(
    statusCode: HttpStatus,
    error: string,
    message?: string | string[],
  ) {
    this.statusCode = statusCode;
    this.error = error;
    this.message = message ? [].concat(message) : [];
  }
}
