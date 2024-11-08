import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UsersServiceInterface } from './users.service.interface';
import { SignupDto } from '../auth/dto';
import { User } from './entities';

@Injectable()
export class UsersService implements UsersServiceInterface {
  constructor(@InjectRepository(User) private _usersRepo: Repository<User>) {}

  async find(id: string): Promise<User> {
    return await this._usersRepo.findOne({ where: { id } });
  }

  async create(data: SignupDto): Promise<User> {
    data.password = await bcrypt.hash(data.password, 10);
    const NEW_USER = await this._usersRepo.save(
      await this._usersRepo.create(data),
    );

    return NEW_USER;
  }
}
