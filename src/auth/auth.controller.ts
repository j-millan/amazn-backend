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
import { SignUpDto } from 'src/auth/dto';

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
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  async singUp(@Body() data: SignUpDto): Promise<User> {
    return await this._authService.signUp(data);
  }
}
