import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import ListProductsByDescriptionService from '@modules/products/services/ListProductsByDescriptionService';
import Product from '@modules/products/infra/typeorm/entities/Product';

class ProductsByDescriptionController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { description } = req.params;
    const listProducts = container.resolve(ListProductsByDescriptionService);
    const products = await listProducts.execute({ description });

    return res.json(classToClass(plainToClass(Product, products)));
  }
}

export default ProductsByDescriptionController;
