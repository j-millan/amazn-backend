import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { UsersServiceInterface } from './users.service.interface';
import { UserFiltersInterface } from './interfaces';
import { SignUpDto } from '../auth/dto';
import { User } from './entities';

@Injectable()
export class UsersService implements UsersServiceInterface {
  constructor(@InjectRepository(User) private _usersRepo: Repository<User>) {}

  async find(filters: UserFiltersInterface): Promise<User | null> {
    try {
      return await this._usersRepo.findOneOrFail({ where: filters });
    } catch {
      return null;
    }
  }

  async findByEmailOrPhoneNumber(credential: string): Promise<User | null> {
    const EMAIL_USER = credential
      ? await this.find({ email: credential })
      : null;
    const PHONE_USER = credential
      ? await this.find({
          phoneNumber: credential,
        })
      : null;

    return EMAIL_USER || PHONE_USER;
  }

  async create(data: SignUpDto): Promise<User> {
    const DATA = {
      ...data,
      password: await bcrypt.hash(data.password, 10),
    };

    const NEW_USER = await this._usersRepo.save(this._usersRepo.create(DATA));

    return NEW_USER;
  }
}
