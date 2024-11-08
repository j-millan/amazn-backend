import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UsersServiceInterface } from './users.service.interface';
import { SignUpDto } from '../auth/dto';
import { User } from './entities';
import { UserFiltersInterface } from './interfaces';

@Injectable()
export class UsersService implements UsersServiceInterface {
  constructor(@InjectRepository(User) private _usersRepo: Repository<User>) {}

  async find(filters: UserFiltersInterface): Promise<User> {
    return await this._usersRepo.findOne({ where: filters });
  }

  async create(data: SignUpDto): Promise<User> {
    data.password = await bcrypt.hash(data.password, 10);
    const NEW_USER = await this._usersRepo.save(
      await this._usersRepo.create(data),
    );

    return NEW_USER;
  }
}
