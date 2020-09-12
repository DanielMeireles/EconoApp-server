import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Product from '@modules/products/infra/typeorm/entities/Product';

import IFindProductsByNameDTO from '@modules/products/dtos/IFindProductsByNameDTO';

@injectable()
class ListProductsByNameService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name }: IFindProductsByNameDTO): Promise<Product[]> {
    let products = await this.cacheProvider.recover<Product[]>(
      `products-name:${name}`,
    );

    if (!products) {
      products = await this.productsRepository.findByName({ name });

      if (products.length === 0) {
        throw new AppError('Products not found');
      }

      await this.cacheProvider.save(`products-name:${name}`, products);
    }

    return products;
  }
}

export default ListProductsByNameService;
