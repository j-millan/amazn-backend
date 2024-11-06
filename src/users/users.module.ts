import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { InjectionEnum } from './enums';

@Module({
  providers: [
    {
      provide: InjectionEnum.USERS_SERVICE,
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
