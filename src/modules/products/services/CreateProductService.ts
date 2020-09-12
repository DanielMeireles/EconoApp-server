import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, description }: IRequest): Promise<Product> {
    const findProductsWithSameName = await this.productsRepository.findByName({
      name,
    });

    if (findProductsWithSameName.length > 0) {
      throw new AppError('There is already a product with this name');
    }

    const product = await this.productsRepository.create({
      name,
      description,
    });

    await this.cacheProvider.invalidatePrefix('products-list');

    return product;
  }
}

export default CreateProductsService;
