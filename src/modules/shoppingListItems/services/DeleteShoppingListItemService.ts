import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IShoppingListItemsRepository from '@modules/shoppingListItems/repositories/IShoppingListItemsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IDeleteShoppingListItemDTO from '@modules/shoppingListItems/dtos/IDeleteShoppingListItemDTO';

@injectable()
class DeleteShoppingListItemService {
  constructor(
    @inject('ShoppingListItemsRepository')
    private shoppingListItemsRepository: IShoppingListItemsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IDeleteShoppingListItemDTO): Promise<void> {
    const shoppingListItem = await this.shoppingListItemsRepository.findById({
      id,
    });

    if (!shoppingListItem) {
      throw new AppError('Shopping List Item not found');
    }

    await this.shoppingListItemsRepository.delete({
      id,
    });

    await this.cacheProvider.invalidate(
      `shopping-lists-item:${shoppingListItem.shoppinglist_id}`,
    );
  }
}

export default DeleteShoppingListItemService;
