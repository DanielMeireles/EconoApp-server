import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import ListShoppingListsByNameService from '@modules/shoppingLists/services/ListShoppingListsByNameService';
import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';

class ShoppingListsByNameController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name } = request.body;
    const listShoppingLists = container.resolve(ListShoppingListsByNameService);
    const shoppingLists = await listShoppingLists.execute({ user_id, name });

    return response.json(classToClass(plainToClass(ShoppingList, shoppingLists)));
  }
}

export default ShoppingListsByNameController;
