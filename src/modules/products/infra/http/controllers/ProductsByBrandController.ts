import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import ListProductsByBrandService from '@modules/products/services/ListProductsByBrandService';
import Product from '@modules/products/infra/typeorm/entities/Product';

class ProductsByBrandController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductsByBrandService);
    const products = await listProducts.execute({
      brand: request.query.brand as string,
    });

    return response.json(classToClass(plainToClass(Product, products)));
  }
}

export default ProductsByBrandController;
