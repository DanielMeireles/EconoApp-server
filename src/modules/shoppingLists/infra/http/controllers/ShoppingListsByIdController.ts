import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import ListShoppingListsByIdService from '@modules/shoppingLists/services/ListShoppingListsByIdService';
import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';

class ShoppingListsByIdController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { id } = req.body;
    const listShoppingLists = container.resolve(ListShoppingListsByIdService);
    const shoppingLists = await listShoppingLists.execute({ user_id, id });

    return res.json(classToClass(plainToClass(ShoppingList, shoppingLists)));
  }
}

export default ShoppingListsByIdController;
