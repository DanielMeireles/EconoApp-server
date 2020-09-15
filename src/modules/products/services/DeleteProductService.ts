import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IDeleteProductDTO from '@modules/products/dtos/IDeleteProductDTO';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IDeleteProductDTO): Promise<void> {
    const product = await this.productsRepository.findById({
      id,
    });

    if (!product) {
      throw new AppError('Product not found');
    }

    await this.productsRepository.delete({
      id,
    });

    await this.cacheProvider.invalidate('products-list');
    await this.cacheProvider.invalidate(`products-name:${product.name}`);
    await this.cacheProvider.invalidate(`products-brand:${product.brand}`);
  }
}

export default DeleteProductService;
