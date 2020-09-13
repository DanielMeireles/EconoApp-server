import { getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import IShoppingListItemsRepository from '@modules/shoppingListItems/repositories/IShoppingListItemsRepository';
import ICreateShoppingListItemDTO from '@modules/shoppingListItems/dtos/ICreateShoppingListItemDTO';
import IFindShoppingListItemsByShoppingListIdDTO from '@modules/shoppingListItems/dtos/IFindShoppingListItemsByShoppingListIdDTO';

import ShoppingListItem from '@modules/shoppingListItems/infra/typeorm/entities/ShoppingListItem';

class ShoppingListItemsRepository implements IShoppingListItemsRepository {
  private ormRepository: Repository<ShoppingListItem>;

  constructor() {
    this.ormRepository = getRepository(ShoppingListItem);
  }

  public async findByByShoppingListId({
    shoppinglist_id,
  }: IFindShoppingListItemsByShoppingListIdDTO): Promise<ShoppingListItem[]> {
    try {
      const shoppingListItems = await this.ormRepository.find({
        where: { shoppinglist_id },
      });

      return shoppingListItems;
    } catch {
      throw new AppError('Shopping list item not found');
    }
  }

  public async create({
    product_id,
    shoppinglist_id,
  }: ICreateShoppingListItemDTO): Promise<ShoppingListItem> {
    const shoppingListItem = this.ormRepository.create({
      product_id,
      shoppinglist_id,
    });

    await this.ormRepository.save(shoppingListItem);

    return shoppingListItem;
  }

  public async save(
    shoppingListItem: ShoppingListItem,
  ): Promise<ShoppingListItem> {
    return this.ormRepository.save(shoppingListItem);
  }
}

export default ShoppingListItemsRepository;
