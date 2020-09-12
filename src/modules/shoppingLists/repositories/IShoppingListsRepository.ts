import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';
import ICreateShoppingListDTO from '@modules/shoppingLists/dtos/ICreateShoppingListDTO';

interface IShoppingListsRepository {
  findAll(): Promise<ShoppingList[]>;
  findById(id: string): Promise<ShoppingList | undefined>;
  findByName(name: string): Promise<ShoppingList[]>;
  findByDescription(description: string): Promise<ShoppingList[]>;
  findByDate(date: Date): Promise<ShoppingList[]>;
  create(data: ICreateShoppingListDTO): Promise<ShoppingList>;
  save(shoppingList: ShoppingList): Promise<ShoppingList>;
}

export default IShoppingListsRepository;
