import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectionEnum } from './enums/injection.enum';

@Module({
  providers: [
    {
      provide: InjectionEnum.AUTH_SERVICE,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
