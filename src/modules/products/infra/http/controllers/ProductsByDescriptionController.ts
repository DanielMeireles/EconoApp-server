import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import ListProductsByDescriptionService from '@modules/products/services/ListProductsByDescriptionService';
import Product from '@modules/products/infra/typeorm/entities/Product';

class ProductsByDescriptionController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductsByDescriptionService);
    const products = await listProducts.execute({
      description: request.query.description as string,
    });

    return response.json(classToClass(plainToClass(Product, products)));
  }
}

export default ProductsByDescriptionController;
