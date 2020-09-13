import AppError from '@shared/errors/AppError';

import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProductsByBrandService from '@modules/products/services/ListProductsByBrandService';

let fakeProductsRepository: FakeProductsRepository;
let listProductsByBrand: ListProductsByBrandService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProductsByBrand', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProductsByBrand = new ListProductsByBrandService(
      fakeProductsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the products by brand', async () => {
    const product_1 = await fakeProductsRepository.create({
      name: 'Product 1',
      brand: 'Brand 1',
      description: 'Description 1',
    });

    await fakeProductsRepository.create({
      name: 'Product 2',
      brand: 'Brand 2',
      description: 'Description 2',
    });

    await fakeProductsRepository.create({
      name: 'Product 3',
      brand: 'Brand 3',
      description: 'Description 3',
    });

    await listProductsByBrand.execute({ brand: product_1.brand });

    const products = await listProductsByBrand.execute({
      brand: product_1.brand,
    });

    expect(products).toEqual([product_1]);
  });

  it('should not be able to list the products from non-existing brand', async () => {
    expect(
      listProductsByBrand.execute({
        brand: 'non-existing-product-brand',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
