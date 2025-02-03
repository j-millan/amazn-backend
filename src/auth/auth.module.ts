import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JWT_CONFIG } from 'src/core/';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthInjectionEnum } from './enums/injection.enum';
import { AuthService, OTPService } from './services';
import { OTP } from './entities';
import { OTPSubscriber } from './subscribers';

@Module({
  imports: [JWT_CONFIG, TypeOrmModule.forFeature([OTP]), UsersModule],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthInjectionEnum.AUTH_SERVICE,
      useClass: AuthService,
    },
    {
      provide: AuthInjectionEnum.OTP_SERVICE,
      useClass: OTPService,
    },
    OTPSubscriber,
  ],
})
export class AuthModule {}
