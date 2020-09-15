import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import CreateShoppingListService from '@modules/shoppingLists/services/CreateShoppingListService';
import DeleteShoppingListService from '@modules/shoppingLists/services/DeleteShoppingListService';
import UpdateShoppingListService from '@modules/shoppingLists/services/UpdateShoppingListService';
import ListShoppingListsService from '@modules/shoppingLists/services/ListShoppingListsService';
import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';

class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, date } = request.body;

    const createShoppingList = container.resolve(CreateShoppingListService);

    const shoppingList = await createShoppingList.execute({
      name,
      description,
      date,
      user_id: request.user.id,
    });

    return response.json(shoppingList);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name, description, date } = request.body;

    const updateShoppingListService = container.resolve(
      UpdateShoppingListService,
    );

    const shoppingList = await updateShoppingListService.execute({
      id,
      name,
      description,
      date,
      user_id: request.user.id,
    });

    return response.json(classToClass(shoppingList));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listShoppingLists = container.resolve(ListShoppingListsService);

    const shoppingLists = await listShoppingLists.execute({ user_id });

    return response.json(
      classToClass(plainToClass(ShoppingList, shoppingLists)),
    );
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;
    const user_id = request.user.id;

    const deleteShoppingListService = container.resolve(
      DeleteShoppingListService,
    );

    await deleteShoppingListService.execute({
      user_id,
      id,
    });

    return response.json();
  }
}

export default ProductsController;
