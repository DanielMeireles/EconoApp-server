import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProductsService from '@modules/products/services/ListProductsService';

let fakeProductsRepository: FakeProductsRepository;
let listProducts: ListProductsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProducts', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProducts = new ListProductsService(
      fakeProductsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the products', async () => {
    const product_1 = await fakeProductsRepository.create({
      name: 'Product 1',
      description: 'Product 1',
    });

    const product_2 = await fakeProductsRepository.create({
      name: 'Product 2',
      description: 'Product 2',
    });

    const product_3 = await fakeProductsRepository.create({
      name: 'Product 3',
      description: 'Product 3',
    });

    await listProducts.execute();

    const products = await listProducts.execute();

    expect(products).toEqual([product_1, product_2, product_3]);
  });
});
