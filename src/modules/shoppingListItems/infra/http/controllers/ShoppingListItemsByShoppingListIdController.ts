import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import ListShoppingListItemsByShoppingListId from '@modules/shoppingListItems/services/ListShoppingListItemsByShoppingListIdService';
import ShoppingListItem from '@modules/shoppingListItems/infra/typeorm/entities/ShoppingListItem';

class ShoppingListItemsByShoppingListIdController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { shoppinglist_id } = req.body;

    const listShoppingListItemsByShoppingListId = container.resolve(
      ListShoppingListItemsByShoppingListId,
    );

    const shoppingListItems = await listShoppingListItemsByShoppingListId.execute(
      { shoppinglist_id },
    );

    return res.json(
      classToClass(plainToClass(ShoppingListItem, shoppingListItems)),
    );
  }
}

export default ShoppingListItemsByShoppingListIdController;
