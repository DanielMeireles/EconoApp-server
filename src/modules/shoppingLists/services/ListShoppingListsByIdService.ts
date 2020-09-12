import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IShoppingListsRepository from '@modules/shoppingLists/repositories/IShoppingListsRepository';

import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';

import IFindShoppingListsByIdDTO from '@modules/shoppingLists/dtos/IFindShoppingListsByIdDTO';

@injectable()
class ListShoppingListsByIdService {
  constructor(
    @inject('ShoppingListsRepository')
    private shoppingListsRepository: IShoppingListsRepository,
  ) {}

  public async execute({
    user_id,
    id,
  }: IFindShoppingListsByIdDTO): Promise<ShoppingList | undefined> {
    const shoppingList = await this.shoppingListsRepository.findById({
      user_id,
      id,
    });

    if (!shoppingList) {
      throw new AppError('Shopping list not found');
    }

    return shoppingList;
  }
}

export default ListShoppingListsByIdService;
