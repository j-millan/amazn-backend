import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthServiceInterface } from './auth.service.interface';
import { User } from 'src/users/entities';
import { SignUpDto } from 'src/auth/dto';
import { InjectionEnum as UsersInjectionEnum } from 'src/users/enums';
import { UsersServiceInterface } from 'src/users/users.service.interface';
import { HTTP_EXCEPTION_MAP } from 'src/common';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject(UsersInjectionEnum.USERS_SERVICE)
    private _usersService: UsersServiceInterface,
  ) {}

  async signUp(data: SignUpDto): Promise<User> {
    const BAD_REQUEST_EXCEPTION = HTTP_EXCEPTION_MAP.get(
      HttpStatus.BAD_REQUEST,
    );

    if (!data.email && !data.phoneNumber) {
      throw BAD_REQUEST_EXCEPTION('email or phone number is required');
    }

    const EMAIL_USER = this._usersService.find({ email: data.email });
    const PHONE_USER = this._usersService.find({
      phoneNumber: data.phoneNumber,
    });

    if (EMAIL_USER || PHONE_USER) {
      throw BAD_REQUEST_EXCEPTION(
        'the email/phone number provided is already in use',
      );
    }

    return this._usersService.create(data);
  }

  async signIn(): Promise<void> {
    console.log('Sign In');
  }
}
