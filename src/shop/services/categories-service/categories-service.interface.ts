import { CategoryResponseDto } from 'src/shop/dto';

export interface CategoriesServiceInterface {
  getAll(): Promise<CategoryResponseDto[]>;
  find(id: number): Promise<CategoryResponseDto>;
}
