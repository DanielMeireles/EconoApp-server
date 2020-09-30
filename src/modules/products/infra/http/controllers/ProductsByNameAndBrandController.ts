import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import ListProductsByNameAndBrandService from '@modules/products/services/ListProductsByNameAndBrandService';
import Product from '@modules/products/infra/typeorm/entities/Product';

class ProductsByNameAndBrandController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductsByNameAndBrandService);
    const products = await listProducts.execute({
      name: request.query.name as string,
      brand: request.query.brand as string,
    });

    return response.json(classToClass(plainToClass(Product, products)));
  }
}

export default ProductsByNameAndBrandController;
