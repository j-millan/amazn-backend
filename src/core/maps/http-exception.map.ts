import {
  BadRequestException,
  ConflictException,
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
  (message?: string | string[]) => HttpException
>();

const GET_ERROR_OBJECT = (
  message: string,
  statusCode: HttpStatus,
  error: string | string[],
): HttpErrorDto => {
  return new HttpErrorDto(statusCode, message, error);
};

HTTP_EXCEPTION_MAP.set(400, (error?: string | string[]) => {
  return new BadRequestException(
    GET_ERROR_OBJECT('Bad Request', HttpStatus.BAD_REQUEST, error),
  );
});

HTTP_EXCEPTION_MAP.set(401, (error?: string | string[]) => {
  return new UnauthorizedException(
    GET_ERROR_OBJECT('Unauthorized', HttpStatus.UNAUTHORIZED, error),
  );
});

HTTP_EXCEPTION_MAP.set(403, (error?: string | string[]) => {
  return new ForbiddenException(
    GET_ERROR_OBJECT('Forbidden', HttpStatus.FORBIDDEN, error),
  );
});

HTTP_EXCEPTION_MAP.set(404, (error?: string | string[]) => {
  return new NotFoundException(
    GET_ERROR_OBJECT('Not Found', HttpStatus.NOT_FOUND, error),
  );
});

HTTP_EXCEPTION_MAP.set(405, (error?: string | string[]) => {
  return new MethodNotAllowedException(
    GET_ERROR_OBJECT(
      'Method Not Allowed',
      HttpStatus.METHOD_NOT_ALLOWED,
      error,
    ),
  );
});

HTTP_EXCEPTION_MAP.set(408, (error?: string | string[]) => {
  return new GatewayTimeoutException(
    GET_ERROR_OBJECT('Request Timeout', HttpStatus.REQUEST_TIMEOUT, error),
  );
});

HTTP_EXCEPTION_MAP.set(409, (error?: string | string[]) => {
  return new ConflictException(
    GET_ERROR_OBJECT('Conflict', HttpStatus.CONFLICT, error),
  );
});

HTTP_EXCEPTION_MAP.set(500, (error?: string | string[]) => {
  return new InternalServerErrorException(
    GET_ERROR_OBJECT(
      'Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error,
    ),
  );
});

HTTP_EXCEPTION_MAP.set(502, (error?: string | string[]) => {
  return new GatewayTimeoutException(
    GET_ERROR_OBJECT('Bad Gateway', HttpStatus.BAD_GATEWAY, error),
  );
});

HTTP_EXCEPTION_MAP.set(503, (error?: string | string[]) => {
  return new GatewayTimeoutException(
    GET_ERROR_OBJECT(
      'Service Unavailable',
      HttpStatus.SERVICE_UNAVAILABLE,
      error,
    ),
  );
});

HTTP_EXCEPTION_MAP.set(504, (error?: string | string[]) => {
  return new GatewayTimeoutException(
    GET_ERROR_OBJECT('Gateway Timeout', HttpStatus.GATEWAY_TIMEOUT, error),
  );
});
