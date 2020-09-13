import { injectable, inject } from 'tsyringe';

import IShoppingListItemsRepository from '@modules/shoppingListItems/repositories/IShoppingListItemsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import ShoppingListItem from '@modules/shoppingListItems/infra/typeorm/entities/ShoppingListItem';
import IFindShoppingListItemsByShoppingListIdDTO from '@modules/shoppingListItems/dtos/IFindShoppingListItemsByShoppingListIdDTO';

@injectable()
class ListShoppingListItemsByShoppingListIdService {
  constructor(
    @inject('ShoppingListItemsRepository')
    private shoppingListItemsRepository: IShoppingListItemsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    shoppinglist_id,
  }: IFindShoppingListItemsByShoppingListIdDTO): Promise<ShoppingListItem[]> {
    let shoppingListItems = await this.cacheProvider.recover<
      ShoppingListItem[]
    >(`shopping-lists-item:${shoppinglist_id}`);

    if (!shoppingListItems) {
      shoppingListItems = await this.shoppingListItemsRepository.findByByShoppingListId(
        { shoppinglist_id },
      );

      await this.cacheProvider.save(
        `shopping-lists-item:${shoppinglist_id}`,
        shoppingListItems,
      );
    }

    return shoppingListItems;
  }
}

export default ListShoppingListItemsByShoppingListIdService;
