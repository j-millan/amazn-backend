import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersInjectionEnum } from './enums';
import { TypeOrmModule } from '@nestjs/typeorm';
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
