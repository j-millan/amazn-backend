import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JWT_CONFIG } from 'src/core';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthInjectionEnum } from './enums/injection.enum';
import { AuthService } from './services';
import { OTP } from './entities';

@Module({
  imports: [JWT_CONFIG, TypeOrmModule.forFeature([OTP]), UsersModule],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthInjectionEnum.AUTH_SERVICE,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
