import AppError from '@shared/errors/AppError';

import FakeShoppingListsRepository from '@modules/shoppingLists/repositories/fakes/FakeShoppingListsRepository';
import ListShoppingListsByDescriptionService from '@modules/shoppingLists/services/ListShoppingListsByDescriptionService';

let fakeShoppingListsRepository: FakeShoppingListsRepository;
let listShoppingListsByDescription: ListShoppingListsByDescriptionService;

describe('ListShoppingListsByDescription', () => {
  beforeEach(() => {
    fakeShoppingListsRepository = new FakeShoppingListsRepository();

    listShoppingListsByDescription = new ListShoppingListsByDescriptionService(
      fakeShoppingListsRepository,
    );
  });

  it('should be able to list the shopping lists by description', async () => {
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

    const shoppingLists = await listShoppingListsByDescription.execute({
      user_id: shoppingList_1.user_id,
      description: shoppingList_1.description,
    });

    expect(shoppingLists).toEqual([shoppingList_1]);
  });

  it('should not be able to list the shopping lists from non-existing description', async () => {
    const shoppingList_1 = await fakeShoppingListsRepository.create({
      name: 'Shopping List 1',
      description: 'Shopping List Description 1',
      date: new Date(2099, 4, 20, 8, 0, 0),
      user_id: 'User 1',
    });

    expect(
      listShoppingListsByDescription.execute({
        user_id: shoppingList_1.user_id,
        description: 'non-existing-shoppingList-description',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
