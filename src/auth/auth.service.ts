import { Injectable } from '@nestjs/common';
import { AuthServiceInterface } from './auth.service.interface';

@Injectable()
export class AuthService implements AuthServiceInterface {
  async signIn(): Promise<void> {
    console.log('Sign In');
  }
}
