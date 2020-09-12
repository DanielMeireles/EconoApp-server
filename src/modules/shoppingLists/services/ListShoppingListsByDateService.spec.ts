import AppError from '@shared/errors/AppError';

import FakeShoppingListsRepository from '@modules/shoppingLists/repositories/fakes/FakeShoppingListsRepository';
import ListShoppingListsByDateService from '@modules/shoppingLists/services/ListShoppingListsByDateService';

let fakeShoppingListsRepository: FakeShoppingListsRepository;
let listShoppingListsByDate: ListShoppingListsByDateService;

describe('ListShoppingListsByDate', () => {
  beforeEach(() => {
    fakeShoppingListsRepository = new FakeShoppingListsRepository();

    listShoppingListsByDate = new ListShoppingListsByDateService(
      fakeShoppingListsRepository,
    );
  });

  it('should be able to list the shopping lists by date', async () => {
    const shoppingList_1 = await fakeShoppingListsRepository.create({
      name: 'Shopping List 1',
      description: 'Shopping List Description 1',
      date: new Date(2099, 4, 20, 8, 0, 0),
      user_id: 'User 1',
    });

    await fakeShoppingListsRepository.create({
      name: 'Shopping List 2',
      description: 'Shopping List Description 2',
      date: new Date(2099, 5, 20, 8, 0, 0),
      user_id: 'User 1',
    });

    await fakeShoppingListsRepository.create({
      name: 'Shopping List 3',
      description: 'Shopping List Description 3',
      date: new Date(2099, 6, 20, 8, 0, 0),
      user_id: 'User 1',
    });

    const shoppingLists = await listShoppingListsByDate.execute({
      user_id: shoppingList_1.user_id,
      date: shoppingList_1.date,
    });

    expect(shoppingLists).toEqual([shoppingList_1]);
  });

  it('should not be able to list the shopping lists from non-existing date', async () => {
    const shoppingList_1 = await fakeShoppingListsRepository.create({
      name: 'Shopping List 1',
      description: 'Shopping List Description 1',
      date: new Date(2099, 4, 20, 8, 0, 0),
      user_id: 'User 1',
    });

    expect(
      listShoppingListsByDate.execute({
        user_id: shoppingList_1.user_id,
        date: new Date(2098, 4, 20, 8, 0, 0),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
