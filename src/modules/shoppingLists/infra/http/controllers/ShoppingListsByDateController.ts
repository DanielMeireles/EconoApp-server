import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import ListShoppingListsByDateService from '@modules/shoppingLists/services/ListShoppingListsByDateService';
import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';

class ShoppingListsByDateController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { date } = req.body;
    const listShoppingLists = container.resolve(ListShoppingListsByDateService);
    const shoppingLists = await listShoppingLists.execute({
      user_id,
      date,
    });

    return res.json(classToClass(plainToClass(ShoppingList, shoppingLists)));
  }
}

export default ShoppingListsByDateController;
