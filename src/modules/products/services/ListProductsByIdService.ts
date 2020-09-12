import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import Product from '@modules/products/infra/typeorm/entities/Product';

import IFindProductsByIdDTO from '@modules/products/dtos/IFindProductsByIdDTO';

@injectable()
class ListProductsByIdService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    id,
  }: IFindProductsByIdDTO): Promise<Product | undefined> {
    const product = await this.productsRepository.findById({ id });

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}

export default ListProductsByIdService;
