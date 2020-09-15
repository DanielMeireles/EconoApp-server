import AppError from '@shared/errors/AppError';

import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import ListProductsByIdService from '@modules/products/services/ListProductsByIdService';

let fakeProductsRepository: FakeProductsRepository;
let deleteProduct: DeleteProductService;
let fakeCacheProvider: FakeCacheProvider;
let listProductsById: ListProductsByIdService;

describe('DeleteProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    deleteProduct = new DeleteProductService(
      fakeProductsRepository,
      fakeCacheProvider,
    );
    listProductsById = new ListProductsByIdService(fakeProductsRepository);
  });

  it('should be able to delete the product', async () => {
    const product = await fakeProductsRepository.create({
      name: 'Product 1',
      brand: 'Brand 1',
      description: 'Description 1',
    });

    await deleteProduct.execute({
      id: product.id,
    });

    expect(
      listProductsById.execute({
        id: product.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete the product from non-existing-id', async () => {
    await expect(
      deleteProduct.execute({
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
