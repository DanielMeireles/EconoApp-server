import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import ListProductsByIdService from '@modules/products/services/ListProductsByIdService';
import Product from '@modules/products/infra/typeorm/entities/Product';

class ProductsByIdController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const listProducts = container.resolve(ListProductsByIdService);
    const products = await listProducts.execute({ id });

    return res.json(classToClass(plainToClass(Product, products)));
  }
}

export default ProductsByIdController;
