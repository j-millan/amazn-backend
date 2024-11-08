import {
  BadRequestException,
  ForbiddenException,
  GatewayTimeoutException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpErrorDto } from '../dto/http-error.dto';

export const HTTP_EXCEPTION_MAP = new Map<
  HttpStatus,
  (message: string) => HttpException
>();

const GET_ERROR_OBJECT = (
  error: string,
  statusCode: HttpStatus,
  message: string | string[],
): HttpErrorDto => {
  return new HttpErrorDto(statusCode, error, message);
};

HTTP_EXCEPTION_MAP.set(400, (message?: string | string[]) => {
  return new BadRequestException(
    GET_ERROR_OBJECT('Bad Request', HttpStatus.BAD_REQUEST, message),
  );
});

HTTP_EXCEPTION_MAP.set(401, (message?: string | string[]) => {
  return new UnauthorizedException(
    GET_ERROR_OBJECT('Unauthorized', HttpStatus.UNAUTHORIZED, message),
  );
});

HTTP_EXCEPTION_MAP.set(403, (message?: string | string[]) => {
  return new ForbiddenException(
    GET_ERROR_OBJECT('Forbidden', HttpStatus.FORBIDDEN, message),
  );
});

HTTP_EXCEPTION_MAP.set(404, (message?: string | string[]) => {
  return new NotFoundException(
    GET_ERROR_OBJECT('Not Found', HttpStatus.NOT_FOUND, message),
  );
});

HTTP_EXCEPTION_MAP.set(405, (message?: string | string[]) => {
  return new MethodNotAllowedException(
    GET_ERROR_OBJECT(
      'Method Not Allowed',
      HttpStatus.METHOD_NOT_ALLOWED,
      message,
    ),
  );
});

HTTP_EXCEPTION_MAP.set(408, (message?: string | string[]) => {
  return new GatewayTimeoutException(
    GET_ERROR_OBJECT('Request Timeout', HttpStatus.REQUEST_TIMEOUT, message),
  );
});

HTTP_EXCEPTION_MAP.set(500, (message?: string | string[]) => {
  return new InternalServerErrorException(
    GET_ERROR_OBJECT(
      'Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR,
      message,
    ),
  );
});

HTTP_EXCEPTION_MAP.set(502, (message?: string | string[]) => {
  return new GatewayTimeoutException(
    GET_ERROR_OBJECT('Bad Gateway', HttpStatus.BAD_GATEWAY, message),
  );
});

HTTP_EXCEPTION_MAP.set(503, (message?: string | string[]) => {
  return new GatewayTimeoutException(
    GET_ERROR_OBJECT(
      'Service Unavailable',
      HttpStatus.SERVICE_UNAVAILABLE,
      message,
    ),
  );
});

HTTP_EXCEPTION_MAP.set(504, (message?: string | string[]) => {
  return new GatewayTimeoutException(
    GET_ERROR_OBJECT('Gateway Timeout', HttpStatus.GATEWAY_TIMEOUT, message),
  );
});
