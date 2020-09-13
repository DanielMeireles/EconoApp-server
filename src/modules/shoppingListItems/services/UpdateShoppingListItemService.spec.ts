import AppError from '@shared/errors/AppError';

import FakeShoppingListItemsRepository from '@modules/shoppingListItems/repositories/fakes/FakeShoppingListItemsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import UpdateShoppingListItemService from '@modules/shoppingListItems/services/UpdateShoppingListItemService';

let fakeShoppingListItemsRepository: FakeShoppingListItemsRepository;
let updateShoppingListItem: UpdateShoppingListItemService;
let fakeCacheProvider: FakeCacheProvider;

describe('UpdateShoppingListItem', () => {
  beforeEach(() => {
    fakeShoppingListItemsRepository = new FakeShoppingListItemsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    updateShoppingListItem = new UpdateShoppingListItemService(
      fakeShoppingListItemsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to update the shopping list item', async () => {
    const shoppingListItem = await fakeShoppingListItemsRepository.create({
      product_id: 'Product 1',
      shoppinglist_id: 'Shopping List 1',
    });

    const date = new Date();

    const updatedShoppingListItem = await updateShoppingListItem.execute({
      id: shoppingListItem.id,
      date,
      product_id: shoppingListItem.product_id,
      shoppinglist_id: shoppingListItem.shoppinglist_id,
      quantity: 1,
      value: 10,
      longitude: 10.0,
      latitude: 20.0,
    });

    expect(updatedShoppingListItem.date).toBe(date);
    expect(updatedShoppingListItem.quantity).toBe(1);
    expect(updatedShoppingListItem.value).toBe(10);
    expect(updatedShoppingListItem.longitude).toBe(10.0);
    expect(updatedShoppingListItem.latitude).toBe(20.0);
  });

  it('should not be able to update the shopping list item from non-existing-id', async () => {
    await expect(
      updateShoppingListItem.execute({
        id: 'non-existing-id',
        date: new Date(),
        product_id: 'Product 1',
        shoppinglist_id: 'Shopping List 1',
        quantity: 1,
        value: 10,
        longitude: 10.0,
        latitude: 10.0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
