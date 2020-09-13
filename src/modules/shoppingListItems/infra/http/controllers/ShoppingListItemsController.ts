import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateShoppingListItemService from '@modules/shoppingListItems/services/CreateShoppingListItemService';

class ShoppingListItemsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { product_id, shoppinglist_id } = req.body;

    const createShoppingListItem = container.resolve(
      CreateShoppingListItemService,
    );

    const shoppingListItem = await createShoppingListItem.execute({
      product_id,
      shoppinglist_id,
    });

    return res.json(shoppingListItem);
  }
}

export default ShoppingListItemsController;
