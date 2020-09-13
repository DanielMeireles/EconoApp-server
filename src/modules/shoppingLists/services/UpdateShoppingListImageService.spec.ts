import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeShoppingListsRepository from '@modules/shoppingLists/repositories/fakes/FakeShoppingListsRepository';
import UpdateShoppingListImage from '@modules/shoppingLists/services/UpdateShoppingListImageService';

let fakeShoppingListsRepository: FakeShoppingListsRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateShoppingListImage: UpdateShoppingListImage;

describe('UpdateShoppingListImage', () => {
  beforeEach(() => {
    fakeShoppingListsRepository = new FakeShoppingListsRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateShoppingListImage = new UpdateShoppingListImage(
      fakeShoppingListsRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update the shopping list image', async () => {
    const shoppingList = await fakeShoppingListsRepository.create({
      name: 'Shopping List 1',
      description: 'Shopping List Description 1',
      date: new Date(),
      user_id: 'User 1',
    });

    await updateShoppingListImage.execute({
      user_id: shoppingList.user_id,
      id: shoppingList.id,
      imageFilename: 'shoppingList.jpg',
    });

    expect(shoppingList.image).toBe('shoppingList.jpg');
  });

  it('should not be able to update image from non existing shopping list', async () => {
    const shoppingList = await fakeShoppingListsRepository.create({
      name: 'Shopping List 1',
      description: 'Shopping List Description 1',
      date: new Date(),
      user_id: 'User 1',
    });

    await expect(
      updateShoppingListImage.execute({
        user_id: shoppingList.user_id,
        id: 'non-existin-shoppingList',
        imageFilename: 'shoppingList.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old image when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const shoppingList = await fakeShoppingListsRepository.create({
      name: 'Shopping List 1',
      description: 'Shopping List Description 1',
      date: new Date(),
      user_id: 'User 1',
    });

    await updateShoppingListImage.execute({
      user_id: shoppingList.user_id,
      id: shoppingList.id,
      imageFilename: 'shoppingList.jpg',
    });

    await updateShoppingListImage.execute({
      user_id: shoppingList.user_id,
      id: shoppingList.id,
      imageFilename: 'shoppingList-new.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('shoppingList.jpg');
    expect(shoppingList.image).toBe('shoppingList-new.jpg');
  });
});
