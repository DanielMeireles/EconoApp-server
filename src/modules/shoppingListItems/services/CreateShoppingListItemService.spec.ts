import FakeShoppingListItemsRepository from '@modules/shoppingListItems/repositories/fakes/FakeShoppingListItemsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateShoppingListItemService from '@modules/shoppingListItems/services/CreateShoppingListItemService';

let fakeShoppingListItemsRepository: FakeShoppingListItemsRepository;
let createShoppingListItem: CreateShoppingListItemService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateShoppingListItem', () => {
  beforeEach(() => {
    fakeShoppingListItemsRepository = new FakeShoppingListItemsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createShoppingListItem = new CreateShoppingListItemService(
      fakeShoppingListItemsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new shopping list item', async () => {
    const shoppingList = await createShoppingListItem.execute({
      product_id: 'Product 1',
      shoppinglist_id: 'Shopping List 1',
    });

    expect(shoppingList).toHaveProperty('id');
  });
});
