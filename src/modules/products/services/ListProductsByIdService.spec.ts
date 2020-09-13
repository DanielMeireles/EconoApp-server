import AppError from '@shared/errors/AppError';

import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import ListProductsByIdService from '@modules/products/services/ListProductsByIdService';

let fakeProductsRepository: FakeProductsRepository;
let listProductsById: ListProductsByIdService;

describe('ListProductsById', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();

    listProductsById = new ListProductsByIdService(fakeProductsRepository);
  });

  it('should be able to list the products by id', async () => {
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

    const product = await listProductsById.execute({ id: product_1.id });

    expect(product).toEqual(product_1);
  });

  it('should not be able to list the products from non-existing id', async () => {
    expect(
      listProductsById.execute({
        id: 'non-existing-product-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
