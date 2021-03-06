import AppError from '@shared/errors/AppError';

import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import ListProductsByDescriptionService from '@modules/products/services/ListProductsByDescriptionService';

let fakeProductsRepository: FakeProductsRepository;
let listProductsByDescription: ListProductsByDescriptionService;

describe('ListProductsByDescription', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();

    listProductsByDescription = new ListProductsByDescriptionService(
      fakeProductsRepository,
    );
  });

  it('should be able to list the products by name', async () => {
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

    const products = await listProductsByDescription.execute({
      description: product_1.description,
    });

    expect(products).toEqual([product_1]);
  });

  it('should not be able to list the products from non-existing description', async () => {
    expect(
      listProductsByDescription.execute({
        description: 'non-existing-product-description',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
