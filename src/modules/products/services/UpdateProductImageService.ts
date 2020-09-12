import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import Product from '@modules/products/infra/typeorm/entities/Product';

interface IRequest {
  product_id: string;
  imageFilename: string;
}

@injectable()
class UpdateProductImageService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    product_id,
    imageFilename,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById({ id: product_id });

    if (!product) {
      throw new AppError(
        'Only authenticated users can change image of product.',
        401,
      );
    }

    if (product.image) {
      await this.storageProvider.deleteFile(product.image);
    }

    const filename = await this.storageProvider.saveFile(imageFilename);

    product.image = filename;

    await this.productsRepository.save(product);

    return product;
  }
}

export default UpdateProductImageService;
