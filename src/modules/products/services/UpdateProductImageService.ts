import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Product from '@modules/products/infra/typeorm/entities/Product';

import IUpdateProductImageDTO from '@modules/products/dtos/IUpdateProductImageDTO';

@injectable()
class UpdateProductImageService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    imageFilename,
  }: IUpdateProductImageDTO): Promise<Product> {
    const product = await this.productsRepository.findById({ id });

    if (!product) {
      throw new AppError('Product not found', 401);
    }

    if (product.image) {
      await this.storageProvider.deleteFile(product.image);
    }

    const filename = await this.storageProvider.saveFile(imageFilename);

    product.image = filename;

    await this.productsRepository.save(product);

    await this.cacheProvider.invalidate('products-list');
    await this.cacheProvider.invalidate(`products-name:${product.name}`);
    await this.cacheProvider.invalidate(`products-brand:${product.brand}`);
    await this.cacheProvider.invalidate(
      `products-name/brand:${product.name}/${product.brand}`,
    );

    return product;
  }
}

export default UpdateProductImageService;
