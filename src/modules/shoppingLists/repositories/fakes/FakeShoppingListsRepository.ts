import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IShoppingListsRepository from '@modules/shoppingLists/repositories/IShoppingListsRepository';

import ICreateShoppingListDTO from '@modules/shoppingLists/dtos/ICreateShoppingListDTO';
import IDeleteShoppingListDTO from '@modules/shoppingLists/dtos/IDeleteShoppingListDTO';
import IFindShoppingListsByIdDTO from '@modules/shoppingLists/dtos/IFindShoppingListsByIdDTO';
import IFindShoppingListsByNameDTO from '@modules/shoppingLists/dtos/IFindShoppingListsByNameDTO';
import IFindShoppingListsByDescriptionDTO from '@modules/shoppingLists/dtos/IFindShoppingListsByDescriptionDTO';
import IFindShoppingListsByDateDTO from '@modules/shoppingLists/dtos/IFindShoppingListsByDateDTO';
import IFindShoppingListsByUserIdDTO from '@modules/shoppingLists/dtos/IFindShoppingListsByUserIdDTO';

import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';

class FakeShoppingListsRepository implements IShoppingListsRepository {
  private shoppingLists: ShoppingList[] = [];

  public async findAll({
    user_id,
  }: IFindShoppingListsByUserIdDTO): Promise<ShoppingList[]> {
    const findShoppingLists = this.shoppingLists.filter(
      shoppingList => shoppingList.user_id === user_id,
    );

    return findShoppingLists;
  }

  public async findById({
    user_id,
    id,
  }: IFindShoppingListsByIdDTO): Promise<ShoppingList | undefined> {
    const findShoppingList = this.shoppingLists.find(
      shoppingList =>
        shoppingList.user_id === user_id && shoppingList.id === id,
    );

    return findShoppingList;
  }

  public async findByName({
    user_id,
    name,
  }: IFindShoppingListsByNameDTO): Promise<ShoppingList[]> {
    const findShoppingList = this.shoppingLists.filter(
      shoppingList =>
        shoppingList.user_id === user_id && shoppingList.name === name,
    );

    return findShoppingList;
  }

  public async findByDescription({
    user_id,
    description,
  }: IFindShoppingListsByDescriptionDTO): Promise<ShoppingList[]> {
    const findShoppingList = this.shoppingLists.filter(
      shoppingList =>
        shoppingList.user_id === user_id &&
        shoppingList.description === description,
    );

    return findShoppingList;
  }

  public async findByDate({
    user_id,
    date,
  }: IFindShoppingListsByDateDTO): Promise<ShoppingList[]> {
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

  public async delete({ user_id, id }: IDeleteShoppingListDTO): Promise<void> {
    const findIndex = this.shoppingLists.findIndex(
      findShoppingList =>
        findShoppingList.id === id && findShoppingList.user_id === user_id,
    );

    this.shoppingLists.splice(findIndex);
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
