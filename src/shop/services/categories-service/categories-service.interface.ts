import { Category } from 'src/shop/entities';

export interface CategoriesServiceInterface {
  getAll(): Promise<Category[]>;
  find(slug?: string, id?: number): Promise<Category>;
}
