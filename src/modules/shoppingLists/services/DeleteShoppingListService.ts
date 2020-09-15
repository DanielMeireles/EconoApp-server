import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IShoppingListsRepository from '@modules/shoppingLists/repositories/IShoppingListsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IDeleteShoppingListDTO from '@modules/shoppingLists/dtos/IDeleteShoppingListDTO';

@injectable()
class DeleteShoppingListService {
  constructor(
    @inject('ShoppingListsRepository')
    private shoppingListsRepository: IShoppingListsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id, id }: IDeleteShoppingListDTO): Promise<void> {
    const shoppingList = await this.shoppingListsRepository.findById({
      user_id,
      id,
    });

    if (!shoppingList) {
      throw new AppError('Shopping list not found');
    }

    await this.shoppingListsRepository.delete({
      user_id,
      id,
    });

    await this.cacheProvider.invalidate(`shopping-lists:${user_id}`);
  }
}

export default DeleteShoppingListService;
