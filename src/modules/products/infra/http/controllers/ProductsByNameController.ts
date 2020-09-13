import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import ListProductsByNameService from '@modules/products/services/ListProductsByNameService';
import Product from '@modules/products/infra/typeorm/entities/Product';

class ProductsByNameController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const listProducts = container.resolve(ListProductsByNameService);
    const products = await listProducts.execute({ name });

    return res.json(classToClass(plainToClass(Product, products)));
  }
}

export default ProductsByNameController;
