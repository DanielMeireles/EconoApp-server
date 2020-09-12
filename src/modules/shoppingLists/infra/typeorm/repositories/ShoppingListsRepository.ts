import { getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import IShoppingListsRepository from '@modules/shoppingLists/repositories/IShoppingListsRepository';
import ICreateShoppingListDTO from '@modules/shoppingLists/dtos/ICreateShoppingListDTO';

import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';

class ShoppingListsRepository implements IShoppingListsRepository {
  private ormRepository: Repository<ShoppingList>;

  constructor() {
    this.ormRepository = getRepository(ShoppingList);
  }

  public async findAll(user_id: string): Promise<ShoppingList[]> {
    const shoppingLists = await this.ormRepository.find({ where: { user_id } });

    return shoppingLists;
  }

  public async findById(
    user_id: string,
    id: string,
  ): Promise<ShoppingList | undefined> {
    try {
      const shoppingList = await this.ormRepository.findOne({
        where: { user_id, id },
      });

      return shoppingList;
    } catch {
      throw new AppError('Shopping List not found');
    }
  }

  public async findByName(
    user_id: string,
    name: string,
  ): Promise<ShoppingList[]> {
    const shoppingList = await this.ormRepository.find({
      where: { user_id, name },
    });

    return shoppingList;
  }

  public async findByDescription(
    user_id: string,
    description: string,
  ): Promise<ShoppingList[]> {
    const shoppingList = await this.ormRepository.find({
      where: { user_id, description },
    });

    return shoppingList;
  }

  public async findByDate(
    user_id: string,
    date: Date,
  ): Promise<ShoppingList[]> {
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

  public async save(shoppingList: ShoppingList): Promise<ShoppingList> {
    return this.ormRepository.save(shoppingList);
  }
}

export default ShoppingListsRepository;
