import AppError from '@shared/errors/AppError';

import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import UpdateProductService from '@modules/products/services/UpdateProductService';

let fakeProductsRepository: FakeProductsRepository;
let updateProduct: UpdateProductService;
let fakeCacheProvider: FakeCacheProvider;

describe('UpdateProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    updateProduct = new UpdateProductService(
      fakeProductsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to update the product', async () => {
    const product = await fakeProductsRepository.create({
      name: 'Product 1',
      brand: 'Brand 1',
      description: 'Description 1',
    });

    const updatedProduct = await updateProduct.execute({
      id: product.id,
      name: 'New Product 1',
      brand: 'New Brand 1',
      description: 'New Description 1',
    });

    expect(updatedProduct.name).toBe('New Product 1');
    expect(updatedProduct.brand).toBe('New Brand 1');
    expect(updatedProduct.description).toBe('New Description 1');
  });

  it('should not be able to update the product from non-existing-id', async () => {
    await expect(
      updateProduct.execute({
        id: 'non-existing-id',
        name: 'New Product 1',
        brand: 'New Brand 1',
        description: 'New Description 1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
