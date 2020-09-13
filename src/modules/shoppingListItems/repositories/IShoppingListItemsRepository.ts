import ShoppingListItem from '@modules/shoppingListItems/infra/typeorm/entities/ShoppingListItem';
import ICreateShoppingListItemDTO from '@modules/shoppingListItems/dtos/ICreateShoppingListItemDTO';
import IFindShoppingListItemsByShoppingListIdDTO from '@modules/shoppingListItems/dtos/IFindShoppingListItemsByShoppingListIdDTO';

interface IShoppingListItemsRepository {
  findByByShoppingListId(
    data: IFindShoppingListItemsByShoppingListIdDTO,
  ): Promise<ShoppingListItem[]>;
  create(data: ICreateShoppingListItemDTO): Promise<ShoppingListItem>;
  save(shoppingListItem: ShoppingListItem): Promise<ShoppingListItem>;
}

export default IShoppingListItemsRepository;
