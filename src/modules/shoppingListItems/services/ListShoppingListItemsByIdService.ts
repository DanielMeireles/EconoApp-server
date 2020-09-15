import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IShoppingListItemsRepository from '@modules/shoppingListItems/repositories/IShoppingListItemsRepository';

import ShoppingListItem from '@modules/shoppingListItems/infra/typeorm/entities/ShoppingListItem';

import IFindShoppingListItemsByIdDTO from '@modules/shoppingListItems/dtos/IFindShoppingListItemsByIdDTO';

@injectable()
class ListShoppingListItemsByIdService {
  constructor(
    @inject('ShoppingListItemsRepository')
    private shoppingListItemsRepository: IShoppingListItemsRepository,
  ) {}

  public async execute({
    id,
  }: IFindShoppingListItemsByIdDTO): Promise<ShoppingListItem | undefined> {
    const shoppingListItem = await this.shoppingListItemsRepository.findById({
      id,
    });

    if (!shoppingListItem) {
      throw new AppError('Shopping list item not found');
    }

    return shoppingListItem;
  }
}

export default ListShoppingListItemsByIdService;
