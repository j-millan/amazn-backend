import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UsersInjectionEnum } from './enums';
import { UsersService } from './users.service';
import { User } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: UsersInjectionEnum.USERS_SERVICE,
      useClass: UsersService,
    },
  ],
  exports: [
    {
      provide: UsersInjectionEnum.USERS_SERVICE,
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
