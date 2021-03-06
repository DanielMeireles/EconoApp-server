import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IShoppingListsRepository from '@modules/shoppingLists/repositories/IShoppingListsRepository';

import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';

import IFindShoppingListsByNameDTO from '@modules/shoppingLists/dtos/IFindShoppingListsByNameDTO';

@injectable()
class ListShoppingListsByNameService {
  constructor(
    @inject('ShoppingListsRepository')
    private shoppingListsRepository: IShoppingListsRepository,
  ) {}

  public async execute({
    user_id,
    name,
  }: IFindShoppingListsByNameDTO): Promise<ShoppingList[]> {
    const shoppingLists = await this.shoppingListsRepository.findByName({
      user_id,
      name,
    });

    if (shoppingLists.length === 0) {
      throw new AppError('Shopping list not found');
    }

    return shoppingLists;
  }
}

export default ListShoppingListsByNameService;
