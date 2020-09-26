interface IUpdateShoppingListItemDTO {
  id: string;
  date: Date;
  product_id: string;
  shoppinglist_id: string;
  checked: boolean;
  quantity: number;
  value: number;
  longitude: number;
  latitude: number;
}

export default IUpdateShoppingListItemDTO;
