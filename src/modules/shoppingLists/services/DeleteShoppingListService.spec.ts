import AppError from '@shared/errors/AppError';

import FakeShoppingListsRepository from '@modules/shoppingLists/repositories/fakes/FakeShoppingListsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import DeleteShoppingListService from '@modules/shoppingLists/services/DeleteShoppingListService';
import ListShoppingListsByIdService from '@modules/shoppingLists/services/ListShoppingListsByIdService';

let fakeShoppingListsRepository: FakeShoppingListsRepository;
let deleteShoppingList: DeleteShoppingListService;
let fakeCacheProvider: FakeCacheProvider;
let listShoppingListsById: ListShoppingListsByIdService;

describe('DeleteShoppingList', () => {
  beforeEach(() => {
    fakeShoppingListsRepository = new FakeShoppingListsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    deleteShoppingList = new DeleteShoppingListService(
      fakeShoppingListsRepository,
      fakeCacheProvider,
    );
    listShoppingListsById = new ListShoppingListsByIdService(
      fakeShoppingListsRepository,
    );
  });

  it('should be able to delete the shopping list', async () => {
    const shoppingList = await fakeShoppingListsRepository.create({
      name: 'Shopping List 1',
      description: 'Shopping List Description 1',
      date: new Date(),
      user_id: 'User 1',
    });

    await deleteShoppingList.execute({
      user_id: shoppingList.user_id,
      id: shoppingList.id,
    });

    expect(
      listShoppingListsById.execute({
        user_id: shoppingList.user_id,
        id: shoppingList.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete the shopping list from non-existing-id', async () => {
    await expect(
      deleteShoppingList.execute({
        user_id: 'non-existing-user-id',
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
