import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { InjectionEnum } from 'src/core';
import { UsersService } from './users.service';
import { User } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: InjectionEnum.USERS_SERVICE,
      useClass: UsersService,
    },
  ],
  exports: [
    {
      provide: InjectionEnum.USERS_SERVICE,
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
