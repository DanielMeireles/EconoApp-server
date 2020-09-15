import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';
import ICreateShoppingListDTO from '@modules/shoppingLists/dtos/ICreateShoppingListDTO';
import IDeleteShoppingListDTO from '@modules/shoppingLists/dtos/IDeleteShoppingListDTO';
import IFindShoppingListsByIdDTO from '@modules/shoppingLists/dtos/IFindShoppingListsByIdDTO';
import IFindShoppingListsByNameDTO from '@modules/shoppingLists/dtos/IFindShoppingListsByNameDTO';
import IFindShoppingListsByDescriptionDTO from '@modules/shoppingLists/dtos/IFindShoppingListsByDescriptionDTO';
import IFindShoppingListsByDateDTO from '@modules/shoppingLists/dtos/IFindShoppingListsByDateDTO';
import IFindShoppingListsByUserIdDTO from '@modules/shoppingLists/dtos/IFindShoppingListsByUserIdDTO';

interface IShoppingListsRepository {
  findAll(data: IFindShoppingListsByUserIdDTO): Promise<ShoppingList[]>;
  findById(data: IFindShoppingListsByIdDTO): Promise<ShoppingList | undefined>;
  findByName(data: IFindShoppingListsByNameDTO): Promise<ShoppingList[]>;
  findByDescription(
    data: IFindShoppingListsByDescriptionDTO,
  ): Promise<ShoppingList[]>;
  findByDate(data: IFindShoppingListsByDateDTO): Promise<ShoppingList[]>;
  create(data: ICreateShoppingListDTO): Promise<ShoppingList>;
  delete(data: IDeleteShoppingListDTO): Promise<void>;
  save(shoppingList: ShoppingList): Promise<ShoppingList>;
}

export default IShoppingListsRepository;
