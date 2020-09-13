import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateShoppingListItemService from '@modules/shoppingListItems/services/CreateShoppingListItemService';
import UpdateShoppingListItemService from '@modules/shoppingListItems/services/UpdateShoppingListItemService';

class ShoppingListItemsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { product_id, shoppinglist_id } = request.body;

    const createShoppingListItem = container.resolve(
      CreateShoppingListItemService,
    );

    const shoppingListItem = await createShoppingListItem.execute({
      product_id,
      shoppinglist_id,
    });

    return response.json(shoppingListItem);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      id,
      date,
      product_id,
      shoppinglist_id,
      quantity,
      value,
      longitude,
      latitude,
    } = request.body;

    const updateShoppingListItemService = container.resolve(
      UpdateShoppingListItemService,
    );

    const shoppingListItem = await updateShoppingListItemService.execute({
      id,
      date,
      product_id,
      shoppinglist_id,
      quantity,
      value,
      longitude,
      latitude,
    });

    return response.json(classToClass(shoppingListItem));
  }
}

export default ShoppingListItemsController;
