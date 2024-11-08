import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthServiceInterface } from './auth.service.interface';
import { User } from 'src/users/entities';
import { SignUpDto } from 'src/auth/dto';
import { InjectionEnum as UsersInjectionEnum } from 'src/users/enums';
import { UsersServiceInterface } from 'src/users/users.service.interface';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject(UsersInjectionEnum.USERS_SERVICE)
    private _usersService: UsersServiceInterface,
  ) {}

  async signUp(data: SignUpDto): Promise<User> {
    if (!data.email && !data.phoneNumber) {
      throw new HttpException(
        'Email or phone number is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const EMAIL_USER = this._usersService.find({ email: data.email });
    const PHONE_USER = this._usersService.find({
      phoneNumber: data.phoneNumber,
    });

    if (EMAIL_USER || PHONE_USER) {
      throw new HttpException(
        'The email/phone number provided is already in use',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this._usersService.create(data);
  }

  async signIn(): Promise<void> {
    console.log('Sign In');
  }
}
