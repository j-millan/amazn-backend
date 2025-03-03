import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { CONNECTION_OPTIONS } from './data-source';
import { CategorySeeder1740971031301 } from './seeds/1740971031301-CategorySeeder';
import { ProductSeeder1740979765708 } from './seeds/1740979765708-ProductSeeder';

(async () => {
  const SEEDS: any[] = [CategorySeeder1740971031301];

  if (process.env.SEED_ENVIRONMENT !== 'prod') {
    SEEDS.push(ProductSeeder1740979765708);
  }

  const OPTIONS = {
    ...CONNECTION_OPTIONS,
    seeds: SEEDS,
  };

  const DATA_SOURCE = new DataSource(OPTIONS);

  await DATA_SOURCE.initialize();
  await runSeeders(DATA_SOURCE);
})();
