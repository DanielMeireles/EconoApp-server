import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import Product from '@modules/products/infra/typeorm/entities/Product';

interface IRequest {
  description: string;
}

@injectable()
class ListProductsByDescriptionService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ description }: IRequest): Promise<Product[]> {
    const products = await this.productsRepository.findByDescription(
      description,
    );

    if (products.length === 0) {
      throw new AppError('Product not found');
    }

    return products;
  }
}

export default ListProductsByDescriptionService;
