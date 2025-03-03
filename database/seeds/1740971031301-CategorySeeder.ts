import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { Category } from '../../src/shop/entities';
import { CATEGORIES } from '../data/categories';
import slugify from 'slugify';

export class CategorySeeder1740971031301 implements Seeder {
  track = false;

  public async run(dataSource: DataSource): Promise<any> {
    const REPO = dataSource.getRepository(Category);
    this._setSlugs(CATEGORIES);

    await REPO.query('DELETE FROM product');
    await REPO.query('DELETE FROM category');
    await REPO.query('ALTER SEQUENCE category_id_seq RESTART WITH 1');
    await REPO.save(REPO.create(CATEGORIES));
  }

  private _setSlugs(categories: any[]) {
    categories.forEach((category) => {
      category.slug = slugify(category.description, { lower: true });
      if (category.children?.length) {
        this._setSlugs(category.children);
      }
    });
  }
}
