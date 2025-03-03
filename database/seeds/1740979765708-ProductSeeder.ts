import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { Product } from '../../src/shop/entities';
import { PRODUCTS } from '../data/products';
import slugify from 'slugify';

export class ProductSeeder1740979765708 implements Seeder {
  track = false;

  public async run(dataSource: DataSource): Promise<any> {
    const REPO = dataSource.getRepository(Product);
    await REPO.query('DELETE FROM product');

    PRODUCTS.forEach((product) => {
      product.slug = slugify(product.name, { lower: true });
    });

    REPO.save(REPO.create(PRODUCTS));
  }
}
