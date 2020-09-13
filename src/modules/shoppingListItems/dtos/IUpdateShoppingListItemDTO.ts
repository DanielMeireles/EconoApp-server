interface IUpdateShoppingListItemDTO {
  id: string;
  date: Date;
  product_id: string;
  shoppinglist_id: string;
  quantity: number;
  value: number;
  longitude: number;
  latitude: number;
}

export default IUpdateShoppingListItemDTO;
