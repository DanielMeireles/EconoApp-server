import { getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import IShoppingListsRepository from '@modules/shoppingLists/repositories/IShoppingListsRepository';
import ICreateShoppingListDTO from '@modules/shoppingLists/dtos/ICreateShoppingListDTO';
import IDeleteShoppingListDTO from '@modules/shoppingLists/dtos/IDeleteShoppingListDTO';
import IFindShoppingListsByIdDTO from '@modules/shoppingLists/dtos/IFindShoppingListsByIdDTO';
import IFindShoppingListsByNameDTO from '@modules/shoppingLists/dtos/IFindShoppingListsByNameDTO';
import IFindShoppingListsByDescriptionDTO from '@modules/shoppingLists/dtos/IFindShoppingListsByDescriptionDTO';
import IFindShoppingListsByDateDTO from '@modules/shoppingLists/dtos/IFindShoppingListsByDateDTO';
import IFindShoppingListsByUserIdDTO from '@modules/shoppingLists/dtos/IFindShoppingListsByUserIdDTO';

import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';

class ShoppingListsRepository implements IShoppingListsRepository {
  private ormRepository: Repository<ShoppingList>;

  constructor() {
    this.ormRepository = getRepository(ShoppingList);
  }

  public async findAll({
    user_id,
  }: IFindShoppingListsByUserIdDTO): Promise<ShoppingList[]> {
    const shoppingLists = await this.ormRepository.find({ where: { user_id } });

    return shoppingLists;
  }

  public async findById({
    user_id,
    id,
  }: IFindShoppingListsByIdDTO): Promise<ShoppingList | undefined> {
    try {
      const shoppingList = await this.ormRepository.findOne({
        where: { user_id, id },
      });

      return shoppingList;
    } catch {
      throw new AppError('Shopping List not found');
    }
  }

  public async findByName({
    user_id,
    name,
  }: IFindShoppingListsByNameDTO): Promise<ShoppingList[]> {
    const shoppingList = await this.ormRepository.find({
      where: { user_id, name },
    });

    return shoppingList;
  }

  public async findByDescription({
    user_id,
    description,
  }: IFindShoppingListsByDescriptionDTO): Promise<ShoppingList[]> {
    const shoppingList = await this.ormRepository.find({
      where: { user_id, description },
    });

    return shoppingList;
  }

  public async findByDate({
    user_id,
    date,
  }: IFindShoppingListsByDateDTO): Promise<ShoppingList[]> {
    const shoppingList = await this.ormRepository.find({
      where: { user_id, date },
    });

    return shoppingList;
  }

  public async create({
    name,
    description,
    date,
    user_id,
  }: ICreateShoppingListDTO): Promise<ShoppingList> {
    const shoppingList = this.ormRepository.create({
      name,
      description,
      date,
      user_id,
    });

    await this.ormRepository.save(shoppingList);

    return shoppingList;
  }

  public async delete({ user_id, id }: IDeleteShoppingListDTO): Promise<void> {
    this.findById({ user_id, id });
    try {
      await this.ormRepository.delete(id);
    } catch {
      throw new AppError('Failure to delete the shopping list');
    }
  }

  public async save(shoppingList: ShoppingList): Promise<ShoppingList> {
    return this.ormRepository.save(shoppingList);
  }
}

export default ShoppingListsRepository;
