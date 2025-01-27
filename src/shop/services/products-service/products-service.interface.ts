import { ProductParamsDto, ProductResponseDto } from 'src/shop/dto';

export interface ProductsServiceInterface {
  getAll(queryParams?: ProductParamsDto): Promise<ProductResponseDto[]>;
  find(id: number): Promise<ProductResponseDto>;
  create(data: any): Promise<ProductResponseDto>;
  delete(id: number): Promise<void>;
}
