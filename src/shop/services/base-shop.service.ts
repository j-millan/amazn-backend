import { PaginationParamsDto } from 'src/core';
import { PaginationInterface } from '../interfaces';

export class BaseShopService {
  protected getPaginationParams(
    params: PaginationParamsDto,
  ): PaginationInterface {
    const PAGE_SIZE = params.pageSize ?? 25;
    const PAGE_NUMBER = params.pageNumber ?? 1;

    return {
      take: PAGE_SIZE,
      skip: (PAGE_NUMBER - 1) * PAGE_SIZE,
    };
  }
}
