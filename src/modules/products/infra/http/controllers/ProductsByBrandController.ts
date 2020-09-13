import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import ListProductsByBrandService from '@modules/products/services/ListProductsByBrandService';
import Product from '@modules/products/infra/typeorm/entities/Product';

class ProductsByBrandController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { brand } = req.body;
    const listProducts = container.resolve(ListProductsByBrandService);
    const products = await listProducts.execute({ brand });

    return res.json(classToClass(plainToClass(Product, products)));
  }
}

export default ProductsByBrandController;
