import AppError from '@shared/errors/AppError';

import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateProductService from '@modules/products/services/CreateProductService';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createProduct = new CreateProductService(
      fakeProductsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new product', async () => {
    const product = await createProduct.execute({
      name: 'Product 1',
      brand: 'Brand 1',
      description: 'Description 1',
    });

    expect(product).toHaveProperty('id');
  });

  it('should not be able to create a new product with same name and brand from another', async () => {
    await createProduct.execute({
      name: 'Product 1',
      brand: 'Brand 1',
      description: 'Description 1',
    });

    await expect(
      createProduct.execute({
        name: 'Product 1',
        brand: 'Brand 1',
        description: 'Description 1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
