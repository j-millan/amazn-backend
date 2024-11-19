import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthServiceInterface } from './auth.service.interface';
import { SignInDto, SignInResponseDto, SignUpDto } from 'src/auth/dto';
import { InjectionEnum as UsersInjectionEnum } from 'src/users/enums';
import { UsersServiceInterface } from 'src/users/users.service.interface';
import { throwHttpException } from 'src/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject(UsersInjectionEnum.USERS_SERVICE)
    private _usersService: UsersServiceInterface,
    private _jwtService: JwtService,
  ) {}

  async signUp(data: SignUpDto): Promise<SignInResponseDto> {
    const EXISTING_USER = await this._usersService.find({ email: data.email });

    if (EXISTING_USER) {
      throwHttpException(
        HttpStatus.BAD_REQUEST,
        'the email address provided is already in use',
      );
    }

    await this._usersService.create(data);
    return this.signIn({
      email: data.email,
      password: data.password,
    });
  }

  async signIn(data: SignInDto): Promise<SignInResponseDto> {
    if (!data.email && !data.phoneNumber) {
      throwHttpException(
        HttpStatus.BAD_REQUEST,
        'email address or phone number is required',
      );
    }

    const USER = await this._usersService.findByEmailOrPhoneNumber(
      data.email,
      data.phoneNumber,
    );

    if (USER) {
      if (await bcrypt.compare(data.password, USER.password)) {
        const PAYLOAD = {
          sub: USER.id,
          email: USER.email || USER.phoneNumber,
          aud: 'user',
        };
        const JWT_TOKEN = await this._jwtService.signAsync(PAYLOAD);
        return new SignInResponseDto(JWT_TOKEN, USER);
      }

      throwHttpException(HttpStatus.UNAUTHORIZED, 'your password is incorrect');
    }

    throwHttpException(
      HttpStatus.UNAUTHORIZED,
      'we cannot find an account with that email address or phone number',
    );
  }
}
