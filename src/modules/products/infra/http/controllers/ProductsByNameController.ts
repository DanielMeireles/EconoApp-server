import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import ListProductsByNameService from '@modules/products/services/ListProductsByNameService';
import Product from '@modules/products/infra/typeorm/entities/Product';

class ProductsByNameController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductsByNameService);
    const products = await listProducts.execute({
      name: request.query.name as string,
    });

    return response.json(classToClass(plainToClass(Product, products)));
  }
}

export default ProductsByNameController;
