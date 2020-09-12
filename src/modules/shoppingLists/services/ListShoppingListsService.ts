import { injectable, inject } from 'tsyringe';

import IShoppingListsRepository from '@modules/shoppingLists/repositories/IShoppingListsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';
import IFindShoppingListsByUserIdDTO from '@modules/shoppingLists/dtos/IFindShoppingListsByUserIdDTO';

@injectable()
class ListShoppingListsService {
  constructor(
    @inject('ShoppingListsRepository')
    private shoppingListsRepository: IShoppingListsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
  }: IFindShoppingListsByUserIdDTO): Promise<ShoppingList[]> {
    let shoppingLists = await this.cacheProvider.recover<ShoppingList[]>(
      `shoppingLists-list:${user_id}`,
    );

    if (!shoppingLists) {
      shoppingLists = await this.shoppingListsRepository.findAll({ user_id });

      await this.cacheProvider.save(
        `shoppingLists-list:${user_id}`,
        shoppingLists,
      );
    }

    return shoppingLists;
  }
}

export default ListShoppingListsService;
