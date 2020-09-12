import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IShoppingListsRepository from '@modules/shoppingLists/repositories/IShoppingListsRepository';

import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';

import IFindShoppingListsByDescriptionDTO from '@modules/shoppingLists/dtos/IFindShoppingListsByDescriptionDTO';

@injectable()
class ListShoppingListsByDescriptionService {
  constructor(
    @inject('ShoppingListsRepository')
    private shoppingListsRepository: IShoppingListsRepository,
  ) {}

  public async execute({
    user_id,
    description,
  }: IFindShoppingListsByDescriptionDTO): Promise<ShoppingList[]> {
    const shoppingList = await this.shoppingListsRepository.findByDescription({
      user_id,
      description,
    });

    if (!shoppingList) {
      throw new AppError('Shopping list not found');
    }

    return shoppingList;
  }
}

export default ListShoppingListsByDescriptionService;
