import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const SERVE_STATIC_MODULE = ServeStaticModule.forRootAsync({
  useFactory: () => {
    const RESOLVED_PATH = join(__dirname, '..', '..', 'public');
    console.debug(RESOLVED_PATH);

    return [
      {
        rootPath: RESOLVED_PATH,
        serveRoot: '/static/',
      },
    ];
  },
});

export default SERVE_STATIC_MODULE;
