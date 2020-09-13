import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';
import IShoppingListsRepository from '@modules/shoppingLists/repositories/IShoppingListsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IUpdateShoppingListDTO from '@modules/shoppingLists/dtos/IUpdateShoppingListDTO';

@injectable()
class UpdateShoppingListService {
  constructor(
    @inject('ShoppingListsRepository')
    private shoppingListsRepository: IShoppingListsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    name,
    description,
    date,
    user_id,
  }: IUpdateShoppingListDTO): Promise<ShoppingList> {
    const shoppingList = await this.shoppingListsRepository.findById({
      user_id,
      id,
    });

    if (!shoppingList) {
      throw new AppError('Shopping List not found');
    }

    Object.assign(shoppingList, {
      id,
      name,
      description,
      date,
      user_id,
    });

    await this.shoppingListsRepository.save(shoppingList);

    await this.cacheProvider.invalidate(`shopping-lists:${user_id}`);

    return shoppingList;
  }
}

export default UpdateShoppingListService;
