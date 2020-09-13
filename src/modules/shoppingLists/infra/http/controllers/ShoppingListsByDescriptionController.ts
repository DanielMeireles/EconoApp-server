import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import ListShoppingListsByDescriptionService from '@modules/shoppingLists/services/ListShoppingListsByDescriptionService';
import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';

class ShoppingListsByDescriptionController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { description } = request.body;
    const listShoppingLists = container.resolve(
      ListShoppingListsByDescriptionService,
    );
    const shoppingLists = await listShoppingLists.execute({
      user_id,
      description,
    });

    return response.json(classToClass(plainToClass(ShoppingList, shoppingLists)));
  }
}

export default ShoppingListsByDescriptionController;
