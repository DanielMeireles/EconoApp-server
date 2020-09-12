import AppError from '@shared/errors/AppError';

import FakeShoppingListsRepository from '@modules/shoppingLists/repositories/fakes/FakeShoppingListsRepository';
import ListShoppingListsByNameService from '@modules/shoppingLists/services/ListShoppingListsByNameService';

let fakeShoppingListsRepository: FakeShoppingListsRepository;
let listShoppingListsByName: ListShoppingListsByNameService;

describe('ListShoppingListsByName', () => {
  beforeEach(() => {
    fakeShoppingListsRepository = new FakeShoppingListsRepository();

    listShoppingListsByName = new ListShoppingListsByNameService(
      fakeShoppingListsRepository,
    );
  });

  it('should be able to list the shopping lists by name', async () => {
    const shoppingList_1 = await fakeShoppingListsRepository.create({
      name: 'Shopping List 1',
      description: 'Shopping List Description 1',
      date: new Date(2099, 4, 20, 8, 0, 0),
      user_id: 'User 1',
    });

    await fakeShoppingListsRepository.create({
      name: 'Shopping List 2',
      description: 'Shopping List Description 2',
      date: new Date(2099, 4, 20, 8, 0, 0),
      user_id: 'User 1',
    });

    await fakeShoppingListsRepository.create({
      name: 'Shopping List 3',
      description: 'Shopping List Description 3',
      date: new Date(2099, 4, 20, 8, 0, 0),
      user_id: 'User 1',
    });

    const shoppingLists = await listShoppingListsByName.execute({
      user_id: shoppingList_1.user_id,
      name: shoppingList_1.name,
    });

    expect(shoppingLists).toEqual([shoppingList_1]);
  });

  it('should not be able to list the shopping lists from non-existing name', async () => {
    const shoppingList_1 = await fakeShoppingListsRepository.create({
      name: 'Shopping List 1',
      description: 'Shopping List Description 1',
      date: new Date(2099, 4, 20, 8, 0, 0),
      user_id: 'User 1',
    });

    expect(
      listShoppingListsByName.execute({
        user_id: shoppingList_1.user_id,
        name: 'non-existing-shoppingList-name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
