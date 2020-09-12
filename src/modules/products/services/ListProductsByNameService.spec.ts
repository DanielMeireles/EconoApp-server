import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProductsByNameService from '@modules/products/services/ListProductsByNameService';

let fakeProductsRepository: FakeProductsRepository;
let listProductsByName: ListProductsByNameService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProductsByName', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProductsByName = new ListProductsByNameService(
      fakeProductsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the products by name', async () => {
    const product_1 = await fakeProductsRepository.create({
      name: 'Product 1',
      description: 'Product 1',
    });

    await fakeProductsRepository.create({
      name: 'Product 2',
      description: 'Product 2',
    });

    await fakeProductsRepository.create({
      name: 'Product 3',
      description: 'Product 3',
    });

    await listProductsByName.execute({ name: 'Product 1' });

    const products = await listProductsByName.execute({ name: 'Product 1' });

    expect(products).toEqual([product_1]);
  });
});
