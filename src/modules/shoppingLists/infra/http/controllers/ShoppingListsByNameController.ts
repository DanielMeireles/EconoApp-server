import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import ListShoppingListsByNameService from '@modules/shoppingLists/services/ListShoppingListsByNameService';
import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';

class ShoppingListsByNameController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name } = req.params;
    const listShoppingLists = container.resolve(ListShoppingListsByNameService);
    const shoppingLists = await listShoppingLists.execute({ user_id, name });

    return res.json(classToClass(plainToClass(ShoppingList, shoppingLists)));
  }
}

export default ShoppingListsByNameController;
