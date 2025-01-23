import { Category, Product } from 'src/shop/entities';
import { User } from 'src/users/entities';

async function registerAdapter(): Promise<void> {
  const [AdminJSTypeorm, { AdminJS }] = await Promise.all([
    import('@adminjs/typeorm'),
    import('adminjs'),
  ]);

  AdminJS.registerAdapter({
    Resource: AdminJSTypeorm.Resource,
    Database: AdminJSTypeorm.Database,
  });
}

const ADMINJS_CONFIG = import('@adminjs/nestjs').then(({ AdminModule }) =>
  AdminModule.createAdminAsync({
    useFactory: async () => {
      await registerAdapter();

      return {
        adminJsOptions: {
          resources: [User, Category, Product],
          rootPath: '/admin',
        },
      };
    },
  }),
);

export default ADMINJS_CONFIG;
