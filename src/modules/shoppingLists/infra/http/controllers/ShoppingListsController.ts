import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import CreateShoppingListService from '@modules/shoppingLists/services/CreateShoppingListService';
import UpdateShoppingListService from '@modules/shoppingLists/services/UpdateShoppingListService';
import ListShoppingListsService from '@modules/shoppingLists/services/ListShoppingListsService';
import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';

class ProductsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, description, date } = req.body;

    const createShoppingList = container.resolve(CreateShoppingListService);

    const shoppingList = await createShoppingList.execute({
      name,
      description,
      date,
      user_id: req.user.id,
    });

    return res.json(shoppingList);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, name, description, date } = req.body;

    const updateShoppingListService = container.resolve(
      UpdateShoppingListService,
    );

    const shoppingList = await updateShoppingListService.execute({
      id,
      name,
      description,
      date,
      user_id: req.user.id,
    });

    return res.json(classToClass(shoppingList));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listShoppingLists = container.resolve(ListShoppingListsService);

    const shoppingLists = await listShoppingLists.execute({ user_id });

    return res.json(classToClass(plainToClass(ShoppingList, shoppingLists)));
  }
}

export default ProductsController;
