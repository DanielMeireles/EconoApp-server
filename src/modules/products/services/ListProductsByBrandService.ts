import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Product from '@modules/products/infra/typeorm/entities/Product';

import IFindProductsByBrAndDTO from '@modules/products/dtos/IFindProductsByBrandDTO';

@injectable()
class ListProductsByBrandService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ brand }: IFindProductsByBrAndDTO): Promise<Product[]> {
    let products = await this.cacheProvider.recover<Product[]>(
      `products-brand:${brand}`,
    );

    if (!products) {
      products = await this.productsRepository.findByBrand({ brand });

      if (products.length === 0) {
        throw new AppError('Products not found');
      }

      await this.cacheProvider.save(`products-brand:${brand}`, products);
    }

    return products;
  }
}

export default ListProductsByBrandService;
