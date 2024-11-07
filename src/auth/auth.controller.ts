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
import { User } from 'src/users/entities';
import { SignupDto } from 'src/auth/dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject(InjectionEnum.AUTH_SERVICE)
    private _authService: AuthServiceInterface,
  ) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'User sign up.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  async singUp(@Body() data: SignupDto): Promise<User> {
    return await this._authService.signUp(data);
  }
}
