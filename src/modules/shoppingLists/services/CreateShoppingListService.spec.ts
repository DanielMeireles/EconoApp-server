import FakeShoppingListsRepository from '@modules/shoppingLists/repositories/fakes/FakeShoppingListsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateShoppingListService from '@modules/shoppingLists/services/CreateShoppingListService';

let fakeShoppingListsRepository: FakeShoppingListsRepository;
let createShoppingList: CreateShoppingListService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateShoppingList', () => {
  beforeEach(() => {
    fakeShoppingListsRepository = new FakeShoppingListsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createShoppingList = new CreateShoppingListService(
      fakeShoppingListsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new shopping list', async () => {
    const shoppingList = await createShoppingList.execute({
      name: 'Shopping List 1',
      description: 'Shopping List Description 1',
      date: new Date(),
      user_id: 'User 1',
    });

    expect(shoppingList).toHaveProperty('id');
  });
});
