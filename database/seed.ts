import { runSeeders } from 'typeorm-extension';
import { CONNECTION_SOURCE } from './data-source';

(async () => {
  await CONNECTION_SOURCE.initialize();
  await runSeeders(CONNECTION_SOURCE);
})();
