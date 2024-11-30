import { Module } from '@nestjs/common';
import { AuthService } from './services';
import { AuthInjectionEnum } from './enums/injection.enum';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { JWT_CONFIG } from 'src/core';
import { TypeOrmModule } from '@nestjs/typeorm';
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
