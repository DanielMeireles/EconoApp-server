import AppError from '@shared/errors/AppError';

import FakeShoppingListsRepository from '@modules/shoppingLists/repositories/fakes/FakeShoppingListsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import UpdateShoppingListService from '@modules/shoppingLists/services/UpdateShoppingListService';

let fakeShoppingListsRepository: FakeShoppingListsRepository;
let updateShoppingList: UpdateShoppingListService;
let fakeCacheProvider: FakeCacheProvider;

describe('UpdateShoppingList', () => {
  beforeEach(() => {
    fakeShoppingListsRepository = new FakeShoppingListsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    updateShoppingList = new UpdateShoppingListService(
      fakeShoppingListsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to update the shopping list', async () => {
    const shoppingList = await fakeShoppingListsRepository.create({
      name: 'Shopping List 1',
      description: 'Shopping List Description 1',
      date: new Date(),
      user_id: 'User 1',
    });

    const date = new Date();

    const updatedShoppingList = await updateShoppingList.execute({
      id: shoppingList.id,
      name: 'New Shopping List 1',
      description: 'New Shopping List Description 1',
      date,
      user_id: shoppingList.user_id,
    });

    expect(updatedShoppingList.name).toBe('New Shopping List 1');
    expect(updatedShoppingList.description).toBe(
      'New Shopping List Description 1',
    );
    expect(updatedShoppingList.date).toBe(date);
  });

  it('should not be able to update the shopping list from non-existing-id', async () => {
    await expect(
      updateShoppingList.execute({
        id: 'non-existing-id',
        name: 'New Shopping List 1',
        description: 'New Shopping List Description 1',
        date: new Date(),
        user_id: 'New User 1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
