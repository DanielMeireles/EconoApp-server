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
  }: IFindProductsByNameAndBrandDTO): Promise<Product> {
    const product = await this.productsRepository.findByNameAndBrand({
      name,
      brand,
    });

    if (!product) {
      throw new AppError('Products not found');
    }

    return product;
  }
}

export default ListProductsByNameAndBrandService;
