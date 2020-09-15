import AppError from '@shared/errors/AppError';

import FakeShoppingListItemsRepository from '@modules/shoppingListItems/repositories/fakes/FakeShoppingListItemsRepository';
import ListShoppingListItemsByIdService from '@modules/shoppingListItems/services/ListShoppingListItemsByIdService';

let fakeShoppingListItemsRepository: FakeShoppingListItemsRepository;
let listShoppingListItemsById: ListShoppingListItemsByIdService;

describe('ListShoppingListItemsById', () => {
  beforeEach(() => {
    fakeShoppingListItemsRepository = new FakeShoppingListItemsRepository();

    listShoppingListItemsById = new ListShoppingListItemsByIdService(
      fakeShoppingListItemsRepository,
    );
  });

  it('should be able to list the shopping list item by id', async () => {
    const shoppingListItem = await fakeShoppingListItemsRepository.create({
      product_id: 'Product 1',
      shoppinglist_id: 'Shopping List 1',
    });

    await fakeShoppingListItemsRepository.create({
      product_id: 'Product 2',
      shoppinglist_id: 'Shopping List 2',
    });

    await fakeShoppingListItemsRepository.create({
      product_id: 'Product 3',
      shoppinglist_id: 'Shopping List 3',
    });

    const product = await listShoppingListItemsById.execute({
      id: shoppingListItem.id,
    });

    expect(product).toEqual(shoppingListItem);
  });

  it('should not be able to list the shopping list items from non-existing id', async () => {
    expect(
      listShoppingListItemsById.execute({
        id: 'non-existing-product-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
