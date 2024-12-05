import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { HttpErrorDto, MessageResponseDto, throwHttpException } from 'src/core';
import { AuthInjectionEnum } from './enums';
import {
  CheckEmailDto,
  SignInDto,
  SignInResponseDto,
  SignUpDto,
  UserResponseDto,
} from 'src/auth/dto';
import { OTPServiceInterface } from './services/otp-service/otp.service.interface';
import { AuthServiceInterface } from './services/auth-service/auth.service.interface';
import { GenerateOTPDto, VerifyOTPDto } from './dto/otp.dto';
import { UsersInjectionEnum } from 'src/users/enums';
import { UsersServiceInterface } from 'src/users/users.service.interface';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject(AuthInjectionEnum.AUTH_SERVICE)
    private _authService: AuthServiceInterface,
    @Inject(UsersInjectionEnum.USERS_SERVICE)
    private _usersService: UsersServiceInterface,
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

  @Post('check-email')
  @HttpCode(HttpStatus.OK)
  @ApiProperty({ type: CheckEmailDto })
  @ApiOperation({ summary: 'Check for email availability.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: MessageResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict',
    type: HttpErrorDto,
  })
  async emailCheck(
    @Body() { email }: CheckEmailDto,
  ): Promise<MessageResponseDto> {
    if (await this._usersService.find({ email })) {
      throwHttpException(
        HttpStatus.CONFLICT,
        'that email address is already in use',
      );
    }

    return { message: 'email is available' };
  }

  @Post('otp/generate')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: GenerateOTPDto })
  @ApiOperation({ summary: 'Generate OTP.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
    type: MessageResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    type: HttpErrorDto,
  })
  async genrateOTP(@Body() data: GenerateOTPDto): Promise<MessageResponseDto> {
    await this._otpService.generateOTP(data);
    return { message: 'OTP has been generated. Check your email.' };
  }

  @Post('otp/verify')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: VerifyOTPDto })
  @ApiOperation({ summary: 'Verify OTP.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: MessageResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: HttpErrorDto,
  })
  async validateOTP(@Body() data: VerifyOTPDto): Promise<MessageResponseDto> {
    await this._otpService.verifyOTP(data);
    return { message: 'OTP verification sucessful.' };
  }
}
