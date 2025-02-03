import {
  ProductParamsDto,
  ProductResponseDto,
  ProductsResponseDto,
} from 'src/shop/dto';

export interface ProductsServiceInterface {
  getAll(params?: ProductParamsDto): Promise<ProductsResponseDto>;
  find(id: number): Promise<ProductResponseDto>;
  create(data: any): Promise<ProductResponseDto>;
  delete(id: number): Promise<void>;
}
