import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Product from '@modules/products/infra/typeorm/entities/Product';

import IFindProductsByNameAndBrandDTO from '@modules/products/dtos/IFindProductsByNameAndBrandDTO';

@injectable()
class ListProductsByNameAndBrandService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    brand,
  }: IFindProductsByNameAndBrandDTO): Promise<Product[]> {
    let products = await this.cacheProvider.recover<Product[]>(
      `products-name/brand:${name}/${brand}`,
    );

    if (!products) {
      products = await this.productsRepository.findByNameAndBrand({
        name,
        brand,
      });

      if (products.length === 0) {
        throw new AppError('Products not found');
      }

      await this.cacheProvider.save(
        `products-name/brand:${name}/${brand}`,
        products,
      );
    }

    return products;
  }
}

export default ListProductsByNameAndBrandService;
