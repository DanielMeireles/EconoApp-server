import AppError from '@shared/errors/AppError';

import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProductsByNameAndBrandService from '@modules/products/services/ListProductsByNameAndBrandService';

let fakeProductsRepository: FakeProductsRepository;
let listProductsByNameAndBrand: ListProductsByNameAndBrandService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProductsByNameAndBrAnd', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProductsByNameAndBrand = new ListProductsByNameAndBrandService(
      fakeProductsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the products by name and brand', async () => {
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

    await listProductsByNameAndBrand.execute({
      name: product_1.name,
      brand: product_1.brand,
    });

    const products = await listProductsByNameAndBrand.execute({
      name: product_1.name,
      brand: product_1.brand,
    });

    expect(products).toEqual(product_1);
  });

  it('should not be able to list the products from non-existing name and brand', async () => {
    expect(
      listProductsByNameAndBrand.execute({
        name: 'non-existing-product-name',
        brand: 'non-existing-product-brand',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
