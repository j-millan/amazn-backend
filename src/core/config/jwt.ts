import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

const JWT_CONFIG = JwtModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService) => ({
    global: true,
    secret: configService.get('JWT_SECRET'),
    signOptions: {
      expiresIn: `${configService.get('JWT_EXPIRES_IN')}s`,
    },
  }),
});

export default JWT_CONFIG;
