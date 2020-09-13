import { injectable, inject } from 'tsyringe';

import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';
import IShoppingListsRepository from '@modules/shoppingLists/repositories/IShoppingListsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import ICreateShoppingListDTO from '@modules/shoppingLists/dtos/ICreateShoppingListDTO';

@injectable()
class CreateShoppingListService {
  constructor(
    @inject('ShoppingListsRepository')
    private shoppingListsRepository: IShoppingListsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    description,
    date,
    user_id,
  }: ICreateShoppingListDTO): Promise<ShoppingList> {
    const shoppingList = await this.shoppingListsRepository.create({
      name,
      description,
      date,
      user_id,
    });

    await this.cacheProvider.invalidate(`shopping-lists:${user_id}`);

    return shoppingList;
  }
}

export default CreateShoppingListService;
