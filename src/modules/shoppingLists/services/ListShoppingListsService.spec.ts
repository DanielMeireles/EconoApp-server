import FakeShoppingListsRepository from '@modules/shoppingLists/repositories/fakes/FakeShoppingListsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListShoppingListsService from '@modules/shoppingLists/services/ListShoppingListsService';

let fakeShoppingListsRepository: FakeShoppingListsRepository;
let listShoppingLists: ListShoppingListsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListShoppingLists', () => {
  beforeEach(() => {
    fakeShoppingListsRepository = new FakeShoppingListsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listShoppingLists = new ListShoppingListsService(
      fakeShoppingListsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the shopping lists', async () => {
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
      user_id: 'User 2',
    });

    await fakeShoppingListsRepository.create({
      name: 'Shopping List 3',
      description: 'Shopping List Description 3',
      date: new Date(2099, 4, 20, 8, 0, 0),
      user_id: 'User 3',
    });

    await listShoppingLists.execute({ user_id: shoppingList_1.user_id });

    const shoppingLists = await listShoppingLists.execute({
      user_id: shoppingList_1.user_id,
    });

    const { id } = shoppingLists[0];

    expect(id).toEqual(shoppingList_1.id);
  });
});
