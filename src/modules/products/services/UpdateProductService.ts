import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IUpdateProductDTO from '@modules/products/dtos/IUpdateProductDTO';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    name,
    brand,
    description,
  }: IUpdateProductDTO): Promise<Product> {
    const product = await this.productsRepository.findById({
      id,
    });

    if (!product) {
      throw new AppError('Product not found');
    }

    Object.assign(product, {
      id,
      name,
      brand,
      description,
    });

    await this.productsRepository.save(product);

    await this.cacheProvider.invalidate('products-list');
    await this.cacheProvider.invalidate(`products-name:${name}`);
    await this.cacheProvider.invalidate(`products-brand:${brand}`);
    await this.cacheProvider.invalidate(`products-name/brand:${name}/${brand}`);

    return product;
  }
}

export default UpdateProductService;
