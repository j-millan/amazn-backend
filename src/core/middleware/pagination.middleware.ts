import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const QUERY = req.query;
    const PAGE_SIZE = QUERY['pageSize'] ? +QUERY['pageSize'] : 25;
    const PAGE_NUMBER = QUERY['pageNumber'] ? +QUERY['pageNumber'] : 1;

    req.query = {
      ...QUERY,
      pageSize: PAGE_SIZE.toString(),
      pageNumber: ((PAGE_NUMBER - 1) * PAGE_SIZE).toString(),
    };

    next();
  }
}
