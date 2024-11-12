import { HttpStatus } from '@nestjs/common';
import { HTTP_EXCEPTION_MAP } from '../maps/http-exception.map';

export function throwHttpException(
  statusCode: HttpStatus,
  message?: string | string[],
): void {
  const EXCEPTION = HTTP_EXCEPTION_MAP.get(statusCode);
  throw EXCEPTION(message);
}
