import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import ListShoppingListsByDateService from '@modules/shoppingLists/services/ListShoppingListsByDateService';
import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';

class ShoppingListsByDateController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { date } = request.params;
    const listShoppingLists = container.resolve(ListShoppingListsByDateService);
    const shoppingLists = await listShoppingLists.execute({
      user_id,
      date: new Date(date),
    });

    return response.json(
      classToClass(plainToClass(ShoppingList, shoppingLists)),
    );
  }
}

export default ShoppingListsByDateController;
