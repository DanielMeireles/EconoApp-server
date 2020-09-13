import { injectable, inject } from 'tsyringe';

import ShoppingListItem from '@modules/shoppingListItems/infra/typeorm/entities/ShoppingListItem';
import IShoppingListItemsRepository from '@modules/shoppingListItems/repositories/IShoppingListItemsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import ICreateShoppingListItemDTO from '@modules/shoppingListItems/dtos/ICreateShoppingListItemDTO';

@injectable()
class CreateShoppingListItemService {
  constructor(
    @inject('ShoppingListItemsRepository')
    private shoppingListItemsRepository: IShoppingListItemsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    product_id,
    shoppinglist_id,
  }: ICreateShoppingListItemDTO): Promise<ShoppingListItem> {
    const shoppingListItem = await this.shoppingListItemsRepository.create({
      product_id,
      shoppinglist_id,
    });

    await this.cacheProvider.invalidate(
      `shopping-lists-item:${shoppinglist_id}`,
    );

    return shoppingListItem;
  }
}

export default CreateShoppingListItemService;
