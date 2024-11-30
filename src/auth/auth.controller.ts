import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { HttpErrorDto } from 'src/core';
import { AuthInjectionEnum } from './enums';
import {
  SignInDto,
  SignInResponseDto,
  SignUpDto,
  UserResponseDto,
} from 'src/auth/dto';
import { OTPServiceInterface } from './services/otp-service/otp.service.interface';
import { AuthServiceInterface } from './services/auth-service/auth.service.interface';
import { GenerateOTPDto, VerifyOTPDto } from './dto/otp.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject(AuthInjectionEnum.AUTH_SERVICE)
    private _authService: AuthServiceInterface,
    @Inject(AuthInjectionEnum.OTP_SERVICE)
    private _otpService: OTPServiceInterface,
  ) {}

  @Post('sign-up')
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

  @Post('otp/generate')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: GenerateOTPDto })
  @ApiOperation({ summary: 'Generate OTP.' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    type: HttpErrorDto,
  })
  async genrateOTP(@Body() data: GenerateOTPDto): Promise<void> {
    return await this._otpService.generateOTP(data);
  }

  @Post('otp/verify')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: VerifyOTPDto })
  @ApiOperation({ summary: 'Verify OTP.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OK' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: HttpErrorDto,
  })
  async validateOTP(@Body() data: VerifyOTPDto): Promise<void> {
    return await this._otpService.verifyOTP(data);
  }
}
