import AppError from '@shared/errors/AppError';

import FakeShoppingListsRepository from '@modules/shoppingLists/repositories/fakes/FakeShoppingListsRepository';
import ListShoppingListsByIdService from '@modules/shoppingLists/services/ListShoppingListsByIdService';

let fakeShoppingListsRepository: FakeShoppingListsRepository;
let listShoppingListsById: ListShoppingListsByIdService;

describe('ListShoppingListsById', () => {
  beforeEach(() => {
    fakeShoppingListsRepository = new FakeShoppingListsRepository();

    listShoppingListsById = new ListShoppingListsByIdService(
      fakeShoppingListsRepository,
    );
  });

  it('should be able to list the shopping lists by id', async () => {
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

    const shoppingList = await listShoppingListsById.execute({
      user_id: shoppingList_1.user_id,
      id: shoppingList_1.id,
    });

    expect(shoppingList).toEqual(shoppingList_1);
  });

  it('should not be able to list the shopping lists from non-existing id', async () => {
    const shoppingList_1 = await fakeShoppingListsRepository.create({
      name: 'Shopping List 1',
      description: 'Shopping List Description 1',
      date: new Date(2099, 4, 20, 8, 0, 0),
      user_id: 'User 1',
    });

    expect(
      listShoppingListsById.execute({
        user_id: shoppingList_1.user_id,
        id: 'non-existing-shoppingList-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
