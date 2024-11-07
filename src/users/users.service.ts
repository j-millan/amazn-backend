import { Injectable } from '@nestjs/common';
import { UserServiceInterface } from './users.service.interface';
import { User } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService implements UserServiceInterface {
  constructor(@InjectRepository(User) private _usersRepo: Repository<User>) {}

  async find(id: string): Promise<User> {
    return await this._usersRepo.findOne({ where: { id } });
  }
}
