import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import CreateProductService from '@modules/products/services/CreateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import ListProductsService from '@modules/products/services/ListProductsService';
import Product from '@modules/products/infra/typeorm/entities/Product';

class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, brand, description } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      brand,
      description,
    });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name, brand, description } = request.body;

    const updateProductService = container.resolve(UpdateProductService);

    const product = await updateProductService.execute({
      id,
      name,
      brand,
      description,
    });

    return response.json(classToClass(product));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;

    const deleteProductService = container.resolve(DeleteProductService);

    await deleteProductService.execute({
      id,
    });

    return response.json();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductsService);

    const products = await listProducts.execute();

    return response.json(classToClass(plainToClass(Product, products)));
  }
}

export default ProductsController;
