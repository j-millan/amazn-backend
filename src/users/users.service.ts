import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserServiceInterface } from './users.service.interface';
import { User } from './entities';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService implements UserServiceInterface {
  constructor(@InjectRepository(User) private _usersRepo: Repository<User>) {}

  async find(id: string): Promise<User> {
    return await this._usersRepo.findOne({ where: { id } });
  }

  async create(data: CreateUserDto): Promise<User> {
    if (!data.email && !data.phoneNumber) {
      throw new HttpException(
        'Email or phone number is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const NEW_USER = await this._usersRepo.save(
      await this._usersRepo.create(data),
    );

    return NEW_USER;
  }
}
