import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';

class ProductsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      description,
    });

    return res.json(product);
  }
}

export default ProductsController;
