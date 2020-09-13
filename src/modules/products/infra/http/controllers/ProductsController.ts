import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import CreateProductService from '@modules/products/services/CreateProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import ListProductsService from '@modules/products/services/ListProductsService';
import Product from '@modules/products/infra/typeorm/entities/Product';

class ProductsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, brand, description } = req.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      brand,
      description,
    });

    return res.json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, name, brand, description } = req.body;

    const updateProductService = container.resolve(UpdateProductService);

    const product = await updateProductService.execute({
      id,
      name,
      brand,
      description,
    });

    return res.json(classToClass(product));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductsService);

    const products = await listProducts.execute();

    return res.json(classToClass(plainToClass(Product, products)));
  }
}

export default ProductsController;
