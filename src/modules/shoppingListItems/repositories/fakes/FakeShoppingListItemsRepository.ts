import { uuid } from 'uuidv4';

import IShoppingListItemsRepository from '@modules/shoppingListItems/repositories/IShoppingListItemsRepository';

import ICreateShoppingListItemDTO from '@modules/shoppingListItems/dtos/ICreateShoppingListItemDTO';
import IFindShoppingListItemsByIdDTO from '@modules/shoppingListItems/dtos/IFindShoppingListItemsByIdDTO';
import IFindShoppingListItemsByShoppingListIdDTO from '@modules/shoppingListItems/dtos/IFindShoppingListItemsByShoppingListIdDTO';

import ShoppingListItem from '@modules/shoppingListItems/infra/typeorm/entities/ShoppingListItem';

class FakeShoppingListItemsRepository implements IShoppingListItemsRepository {
  private shoppingListItems: ShoppingListItem[] = [];

  public async findById({
    id,
  }: IFindShoppingListItemsByIdDTO): Promise<ShoppingListItem | undefined> {
    const findShoppingListItem = this.shoppingListItems.find(
      shoppingListItem => shoppingListItem.id === id,
    );

    return findShoppingListItem;
  }

  public async findByShoppingListId({
    shoppinglist_id,
  }: IFindShoppingListItemsByShoppingListIdDTO): Promise<ShoppingListItem[]> {
    const findShoppingListItems = this.shoppingListItems.filter(
      shoppingListItem => shoppingListItem.shoppinglist_id === shoppinglist_id,
    );

    return findShoppingListItems;
  }

  public async create({
    product_id,
    shoppinglist_id,
  }: ICreateShoppingListItemDTO): Promise<ShoppingListItem> {
    const shoppingListItem = new ShoppingListItem();

    Object.assign(shoppingListItem, {
      id: uuid(),
      product_id,
      shoppinglist_id,
    });

    this.shoppingListItems.push(shoppingListItem);

    return shoppingListItem;
  }

  public async save(
    shoppingListItem: ShoppingListItem,
  ): Promise<ShoppingListItem> {
    const findIndex = this.shoppingListItems.findIndex(
      findShoppingListItem => findShoppingListItem.id === shoppingListItem.id,
    );

    this.shoppingListItems[findIndex] = shoppingListItem;

    return shoppingListItem;
  }
}

export default FakeShoppingListItemsRepository;
