import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    description,
  }: ICreateProductDTO): Promise<Product> {
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

export default CreateProductService;
