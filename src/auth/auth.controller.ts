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
import { SignUpDto, UserResponseDto } from 'src/auth/dto';
import { plainToInstance } from 'class-transformer';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject(InjectionEnum.AUTH_SERVICE)
    private _authService: AuthServiceInterface,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'User sign up.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  async singUp(@Body() data: SignUpDto): Promise<UserResponseDto> {
    const SERVICE_RESPONSE = await this._authService.signUp(data);
    return plainToInstance(UserResponseDto, SERVICE_RESPONSE);
  }
}
