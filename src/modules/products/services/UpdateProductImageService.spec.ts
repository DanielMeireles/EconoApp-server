import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import UpdateProductImage from '@modules/products/services/UpdateProductImageService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeProductsRepository: FakeProductsRepository;
let fakeStorageProvider: FakeStorageProvider;
let fakeCacheProvider: FakeCacheProvider;

let updateProductImage: UpdateProductImage;

describe('UpdateProductImage', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeStorageProvider = new FakeStorageProvider();
    fakeCacheProvider = new FakeCacheProvider();

    updateProductImage = new UpdateProductImage(
      fakeProductsRepository,
      fakeStorageProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to update the product image', async () => {
    const product = await fakeProductsRepository.create({
      name: 'Product 1',
      brand: 'Brand 1',
      description: 'Description 1',
    });

    await updateProductImage.execute({
      id: product.id,
      imageFilename: 'product.jpg',
    });

    expect(product.image).toBe('product.jpg');
  });

  it('should not be able to update image from non existing product', async () => {
    await expect(
      updateProductImage.execute({
        id: 'non-existin-product',
        imageFilename: 'product.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old image when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const product = await fakeProductsRepository.create({
      name: 'Product 1',
      brand: 'Brand 1',
      description: 'Description 1',
    });

    await updateProductImage.execute({
      id: product.id,
      imageFilename: 'product.jpg',
    });

    await updateProductImage.execute({
      id: product.id,
      imageFilename: 'product-new.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('product.jpg');
    expect(product.image).toBe('product-new.jpg');
  });
});
