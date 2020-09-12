import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IShoppingListsRepository from '@modules/shoppingLists/repositories/IShoppingListsRepository';

import ICreateShoppingListDTO from '@modules/shoppingLists/dtos/ICreateShoppingListDTO';

import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';

class FakeShoppingListsRepository implements IShoppingListsRepository {
  private shoppingLists: ShoppingList[] = [];

  public async findAll(user_id: string): Promise<ShoppingList[]> {
    const findShoppingLists = this.shoppingLists.filter(
      shoppingList => shoppingList.user_id === user_id,
    );

    return findShoppingLists;
  }

  public async findById(
    user_id: string,
    id: string,
  ): Promise<ShoppingList | undefined> {
    const findShoppingList = this.shoppingLists.find(
      shoppingList =>
        shoppingList.user_id === user_id && shoppingList.id === id,
    );

    return findShoppingList;
  }

  public async findByName(
    user_id: string,
    name: string,
  ): Promise<ShoppingList[]> {
    const findShoppingList = this.shoppingLists.filter(
      shoppingList =>
        shoppingList.user_id === user_id && shoppingList.name === name,
    );

    return findShoppingList;
  }

  public async findByDescription(
    user_id: string,
    description: string,
  ): Promise<ShoppingList[]> {
    const findShoppingList = this.shoppingLists.filter(
      shoppingList =>
        shoppingList.user_id === user_id &&
        shoppingList.description === description,
    );

    return findShoppingList;
  }

  public async findByDate(
    user_id: string,
    date: Date,
  ): Promise<ShoppingList[]> {
    const findShoppingList = this.shoppingLists.filter(
      shoppingList =>
        shoppingList.user_id === user_id && isEqual(shoppingList.date, date),
    );

    return findShoppingList;
  }

  public async create({
    name,
    description,
    date,
    user_id,
  }: ICreateShoppingListDTO): Promise<ShoppingList> {
    const shoppingList = new ShoppingList();

    Object.assign(shoppingList, {
      id: uuid(),
      name,
      description,
      date,
      user_id,
    });

    this.shoppingLists.push(shoppingList);

    return shoppingList;
  }

  public async save(shoppingList: ShoppingList): Promise<ShoppingList> {
    const findIndex = this.shoppingLists.findIndex(
      findShoppingList => findShoppingList.id === shoppingList.id,
    );

    this.shoppingLists[findIndex] = shoppingList;

    return shoppingList;
  }
}

export default FakeShoppingListsRepository;
