import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import ListShoppingListItemsByShoppingListId from '@modules/shoppingListItems/services/ListShoppingListItemsByShoppingListIdService';
import ShoppingListItem from '@modules/shoppingListItems/infra/typeorm/entities/ShoppingListItem';

class ShoppingListItemsByShoppingListIdController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listShoppingListItemsByShoppingListId = container.resolve(
      ListShoppingListItemsByShoppingListId,
    );

    const shoppingListItems = await listShoppingListItemsByShoppingListId.execute(
      { shoppinglist_id: request.query.shoppinglist_id as string },
    );

    return response.json(
      classToClass(plainToClass(ShoppingListItem, shoppingListItems)),
    );
  }
}

export default ShoppingListItemsByShoppingListIdController;
