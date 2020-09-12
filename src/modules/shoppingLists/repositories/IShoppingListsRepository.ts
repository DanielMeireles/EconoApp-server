import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';
import ICreateShoppingListDTO from '@modules/shoppingLists/dtos/ICreateShoppingListDTO';

interface IShoppingListsRepository {
  findAll(user_id: string): Promise<ShoppingList[]>;
  findById(user_id: string, id: string): Promise<ShoppingList | undefined>;
  findByName(user_id: string, name: string): Promise<ShoppingList[]>;
  findByDescription(
    user_id: string,
    description: string,
  ): Promise<ShoppingList[]>;
  findByDate(user_id: string, date: Date): Promise<ShoppingList[]>;
  create(data: ICreateShoppingListDTO): Promise<ShoppingList>;
  save(shoppingList: ShoppingList): Promise<ShoppingList>;
}

export default IShoppingListsRepository;
