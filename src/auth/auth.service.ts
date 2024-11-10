import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthServiceInterface } from './auth.service.interface';
import { User } from 'src/users/entities';
import { SignInDto, SignInResponseDto, SignUpDto } from 'src/auth/dto';
import { InjectionEnum as UsersInjectionEnum } from 'src/users/enums';
import { UsersServiceInterface } from 'src/users/users.service.interface';
import { throwHttpException } from 'src/common';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject(UsersInjectionEnum.USERS_SERVICE)
    private _usersService: UsersServiceInterface,
  ) {}

  async signUp(data: SignUpDto): Promise<User> {
    if (!data.email && !data.phoneNumber) {
      throwHttpException(
        HttpStatus.BAD_REQUEST,
        'email or phone number is required',
      );
    }

    const USER = await this._usersService.findByEmailOrPhoneNumber(
      data.email,
      data.phoneNumber,
    );

    console.debug(USER);

    if (USER) {
      throwHttpException(
        HttpStatus.BAD_REQUEST,
        'the email/phone number provided is already in use',
      );
    }

    return this._usersService.create(data);
  }

  async signIn(data: SignInDto): Promise<SignInResponseDto> {
    if (!data.email && !data.phoneNumber) {
      throwHttpException(
        HttpStatus.BAD_REQUEST,
        'email or phone number is required',
      );
    }

    const USER = await this._usersService.findByEmailOrPhoneNumber(
      data.email,
      data.phoneNumber,
    );

    if (USER) {
      if (await bcrypt.compare(data.password, USER.password)) {
        return new SignInResponseDto('valid-jwt-token', USER);
      }
    }

    throwHttpException(
      HttpStatus.BAD_REQUEST,
      'the email/phone number or password provided are incorrect',
    );
  }
}
