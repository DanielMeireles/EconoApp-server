import ShoppingListItem from '@modules/shoppingListItems/infra/typeorm/entities/ShoppingListItem';
import ICreateShoppingListItemDTO from '@modules/shoppingListItems/dtos/ICreateShoppingListItemDTO';
import IDeleteShoppingListItemDTO from '@modules/shoppingListItems/dtos/IDeleteShoppingListItemDTO';
import IFindShoppingListItemsByIdDTO from '@modules/shoppingListItems/dtos/IFindShoppingListItemsByIdDTO';
import IFindShoppingListItemsByShoppingListIdDTO from '@modules/shoppingListItems/dtos/IFindShoppingListItemsByShoppingListIdDTO';

interface IShoppingListItemsRepository {
  findById(
    data: IFindShoppingListItemsByIdDTO,
  ): Promise<ShoppingListItem | undefined>;
  findByShoppingListId(
    data: IFindShoppingListItemsByShoppingListIdDTO,
  ): Promise<ShoppingListItem[]>;
  create(data: ICreateShoppingListItemDTO): Promise<ShoppingListItem>;
  delete(data: IDeleteShoppingListItemDTO): Promise<void>;
  save(shoppingListItem: ShoppingListItem): Promise<ShoppingListItem>;
}

export default IShoppingListItemsRepository;
