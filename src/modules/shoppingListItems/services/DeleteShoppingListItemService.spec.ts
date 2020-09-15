import AppError from '@shared/errors/AppError';

import FakeShoppingListItemsRepository from '@modules/shoppingListItems/repositories/fakes/FakeShoppingListItemsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import DeleteShoppingListItemService from '@modules/shoppingListItems/services/DeleteShoppingListItemService';
import ListShoppingListItemsByIdService from '@modules/shoppingListItems/services/ListShoppingListItemsByIdService';

let fakeShoppingListItemsRepository: FakeShoppingListItemsRepository;
let deleteShoppingListItem: DeleteShoppingListItemService;
let fakeCacheProvider: FakeCacheProvider;
let listShoppingListItemsById: ListShoppingListItemsByIdService;

describe('DeleteProduct', () => {
  beforeEach(() => {
    fakeShoppingListItemsRepository = new FakeShoppingListItemsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    deleteShoppingListItem = new DeleteShoppingListItemService(
      fakeShoppingListItemsRepository,
      fakeCacheProvider,
    );
    listShoppingListItemsById = new ListShoppingListItemsByIdService(
      fakeShoppingListItemsRepository,
    );
  });

  it('should be able to delete the shopping list item', async () => {
    const shoppingListItem = await fakeShoppingListItemsRepository.create({
      product_id: 'Product 1',
      shoppinglist_id: 'Shopping List 1',
    });

    await deleteShoppingListItem.execute({
      id: shoppingListItem.id,
    });

    expect(
      listShoppingListItemsById.execute({
        id: shoppingListItem.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete the shopping list item from non-existing-id', async () => {
    await expect(
      deleteShoppingListItem.execute({
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
