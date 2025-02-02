import { ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const SERVE_STATIC_MODULE = ServeStaticModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const RESOLVED_PATH = join(__dirname, '..', '..', 'public');

    return [
      {
        rootPath: RESOLVED_PATH,
        serveRoot: configService.get('APP_STATIC_PATH'),
      },
    ];
  },
});

export default SERVE_STATIC_MODULE;
