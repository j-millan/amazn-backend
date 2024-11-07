import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectionEnum } from './enums/injection.enum';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    {
      provide: InjectionEnum.AUTH_SERVICE,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
