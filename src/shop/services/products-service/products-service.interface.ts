import { Product } from 'src/shop/entities';

export interface ProductsServiceInterface {
  getAll(): Promise<Product[]>;
  find(id: number): Promise<Product>;
  create(data: any): Promise<Product>;
  delete(id: number): Promise<void>;
}
