import FakeShoppingListItemsRepository from '@modules/shoppingListItems/repositories/fakes/FakeShoppingListItemsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListShoppingListItemsByShoppingListIdService from '@modules/shoppingListItems/services/ListShoppingListItemsByShoppingListIdService';

let fakeShoppingListItemsRepository: FakeShoppingListItemsRepository;
let listShoppingListItemsByShoppingListId: ListShoppingListItemsByShoppingListIdService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListShoppingListItems', () => {
  beforeEach(() => {
    fakeShoppingListItemsRepository = new FakeShoppingListItemsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listShoppingListItemsByShoppingListId = new ListShoppingListItemsByShoppingListIdService(
      fakeShoppingListItemsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the shopping list items', async () => {
    const shoppingListItem_1 = await fakeShoppingListItemsRepository.create({
      product_id: 'Product 1',
      shoppinglist_id: 'Shopping List 1',
    });

    await fakeShoppingListItemsRepository.create({
      product_id: 'Product 2',
      shoppinglist_id: 'Shopping List 2',
    });

    await fakeShoppingListItemsRepository.create({
      product_id: 'Product 3',
      shoppinglist_id: 'Shopping List 3',
    });

    await listShoppingListItemsByShoppingListId.execute({
      shoppinglist_id: shoppingListItem_1.shoppinglist_id,
    });

    const shoppingLists = await listShoppingListItemsByShoppingListId.execute({
      shoppinglist_id: shoppingListItem_1.shoppinglist_id,
    });

    expect(shoppingLists[0].id).toEqual(shoppingListItem_1.id);
  });
});
