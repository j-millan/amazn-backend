import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { InjectionEnum } from './enums';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: InjectionEnum.USERS_SERVICE,
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
