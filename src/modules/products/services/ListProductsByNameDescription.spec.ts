import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProductsByDescriptionService from '@modules/products/services/ListProductsByDescriptionService';

let fakeProductsRepository: FakeProductsRepository;
let listProductsByDescription: ListProductsByDescriptionService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProductsByDescription', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProductsByDescription = new ListProductsByDescriptionService(
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

    await listProductsByDescription.execute({ description: 'Product 1' });

    const products = await listProductsByDescription.execute({
      description: 'Product 1',
    });

    expect(products).toEqual([product_1]);
  });
});
