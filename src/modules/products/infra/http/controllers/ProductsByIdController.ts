import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import ListProductsByIdService from '@modules/products/services/ListProductsByIdService';
import Product from '@modules/products/infra/typeorm/entities/Product';

class ProductsByIdController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;
    const listProducts = container.resolve(ListProductsByIdService);
    const products = await listProducts.execute({ id });

    return response.json(classToClass(plainToClass(Product, products)));
  }
}

export default ProductsByIdController;
