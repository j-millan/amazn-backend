import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { InjectionEnum } from './enums';
import { AuthServiceInterface } from './auth.service.interface';
import { HttpErrorDto } from 'src/core';
import {
  SignInDto,
  SignInResponseDto,
  SignUpDto,
  UserResponseDto,
} from 'src/auth/dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject(InjectionEnum.AUTH_SERVICE)
    private _authService: AuthServiceInterface,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'User signup.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    type: HttpErrorDto,
  })
  async singUp(@Body() data: SignUpDto): Promise<SignInResponseDto> {
    return await this._authService.signUp(data);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: SignInResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: HttpErrorDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    type: HttpErrorDto,
  })
  async signIn(@Body() data: SignInDto): Promise<SignInResponseDto> {
    return await this._authService.signIn(data);
  }
}
