import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { CATEGORIES } from 'database/data/categories';
import { Category } from 'src/shop/entities';

export class CategorySeeder1740971031301 implements Seeder {
  track = false;

  public async run(dataSource: DataSource): Promise<any> {
    const REPO = dataSource.getRepository(Category);
    await REPO.query('ALTER SEQUENCE category_id_seq RESTART WITH 1');
    await REPO.save(REPO.create(CATEGORIES));
  }
}
