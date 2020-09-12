import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IShoppingListsRepository from '@modules/shoppingLists/repositories/IShoppingListsRepository';

import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';

import IFindShoppingListsByDateDTO from '@modules/shoppingLists/dtos/IFindShoppingListsByDateDTO';

@injectable()
class ListShoppingListsByDateService {
  constructor(
    @inject('ShoppingListsRepository')
    private shoppingListsRepository: IShoppingListsRepository,
  ) {}

  public async execute({
    user_id,
    date,
  }: IFindShoppingListsByDateDTO): Promise<ShoppingList[]> {
    const shoppingLists = await this.shoppingListsRepository.findByDate({
      user_id,
      date,
    });

    if (shoppingLists.length === 0) {
      throw new AppError('Shopping list not found');
    }

    return shoppingLists;
  }
}

export default ListShoppingListsByDateService;
