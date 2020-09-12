import { injectable, inject } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Product from '@modules/products/infra/typeorm/entities/Product';

interface IRequest {
  name: string;
}

@injectable()
class ListProductsByNameService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name }: IRequest): Promise<Product[]> {
    let products = await this.cacheProvider.recover<Product[]>(
      `products-name:${name}`,
    );

    if (!products) {
      products = await this.productsRepository.findByName(name);

      await this.cacheProvider.save(`products-name:${name}`, products);
    }

    return products;
  }
}

export default ListProductsByNameService;
