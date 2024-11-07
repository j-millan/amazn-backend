import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthServiceInterface } from './auth.service.interface';
import { User } from 'src/users/entities';
import { SignupDto } from 'src/auth/dto';
import { InjectionEnum as UsersInjectionEnum } from 'src/users/enums';
import { UsersServiceInterface } from 'src/users/users.service.interface';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject(UsersInjectionEnum.USERS_SERVICE)
    private _usersService: UsersServiceInterface,
  ) {}

  async signUp(data: SignupDto): Promise<User> {
    if (!data.email && !data.phoneNumber) {
      throw new HttpException(
        'Email or phone number is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this._usersService.create(data);
  }

  async signIn(): Promise<void> {
    console.log('Sign In');
  }
}
