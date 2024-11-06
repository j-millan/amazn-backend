import { Injectable } from '@nestjs/common';
import { UserServiceInterface } from './users.service.interface';
import { User } from './entities';

@Injectable()
export class UsersService implements UserServiceInterface {
  async find(id: string): Promise<User> {
    console.debug('Find user: ', id);
    return {} as User;
  }
}
