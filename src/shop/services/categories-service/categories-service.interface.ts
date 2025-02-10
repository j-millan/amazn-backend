import { CategoryResponseDto, CreateCategoryDto } from 'src/shop/dto';

export interface CategoriesServiceInterface {
  getAll(): Promise<CategoryResponseDto[]>;
  find(id: number): Promise<CategoryResponseDto>;
  create(data: CreateCategoryDto): Promise<CategoryResponseDto>;
  init(categories: any[]): Promise<void>;
}
