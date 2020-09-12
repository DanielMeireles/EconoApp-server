import { injectable, inject } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Product from '@modules/products/infra/typeorm/entities/Product';

interface IRequest {
  description: string;
}

@injectable()
class ListProductsByDescriptionService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ description }: IRequest): Promise<Product[]> {
    let products = await this.cacheProvider.recover<Product[]>(
      `products-description:${description}`,
    );

    if (!products) {
      products = await this.productsRepository.findByName(description);

      await this.cacheProvider.save(
        `products-description:${description}`,
        products,
      );
    }

    return products;
  }
}

export default ListProductsByDescriptionService;
