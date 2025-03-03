import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InjectionEnum, JWT_CONFIG } from 'src/core/';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService, OTPService } from './services';
import { OTP } from './entities';
import { OTPSubscriber } from './subscribers';

@Module({
  imports: [JWT_CONFIG, TypeOrmModule.forFeature([OTP]), UsersModule],
  controllers: [AuthController],
  providers: [
    {
      provide: InjectionEnum.AUTH_SERVICE,
      useClass: AuthService,
    },
    {
      provide: InjectionEnum.OTP_SERVICE,
      useClass: OTPService,
    },
    OTPSubscriber,
  ],
})
export class AuthModule {}
