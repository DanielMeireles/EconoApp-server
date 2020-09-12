import { injectable, inject } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Product from '@modules/products/infra/typeorm/entities/Product';

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Product[]> {
    let products = await this.cacheProvider.recover<Product[]>('products-list');

    if (!products) {
      products = await this.productsRepository.findAll();

      await this.cacheProvider.save('products-list', products);
    }

    return products;
  }
}

export default ListProductsService;
