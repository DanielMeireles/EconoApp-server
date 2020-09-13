import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IShoppingListsRepository from '@modules/shoppingLists/repositories/IShoppingListsRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';

import IUpdateShoppingListImageDTO from '@modules/shoppingLists/dtos/IUpdateShoppingListImageDTO';

@injectable()
class UpdateShoppingListImageService {
  constructor(
    @inject('ShoppingListsRepository')
    private shoppingListsRepository: IShoppingListsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    id,
    user_id,
    imageFilename,
  }: IUpdateShoppingListImageDTO): Promise<ShoppingList> {
    const shoppingList = await this.shoppingListsRepository.findById({
      user_id,
      id,
    });

    if (!shoppingList) {
      throw new AppError(
        'Only authenticated users can change image of shopping list.',
        401,
      );
    }

    if (shoppingList.image) {
      await this.storageProvider.deleteFile(shoppingList.image);
    }

    const filename = await this.storageProvider.saveFile(imageFilename);

    shoppingList.image = filename;

    await this.shoppingListsRepository.save(shoppingList);

    return shoppingList;
  }
}

export default UpdateShoppingListImageService;
