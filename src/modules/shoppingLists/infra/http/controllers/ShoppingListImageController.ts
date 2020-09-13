import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateShoppingListImageService from '@modules/shoppingLists/services/UpdateShoppingListImageService';

class ShoppingListImageController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateShoppingListImage = container.resolve(
      UpdateShoppingListImageService,
    );

    const shoppingList = await updateShoppingListImage.execute({
      user_id: request.user.id,
      id: request.params.id,
      imageFilename: request.file.filename,
    });

    return response.json(classToClass(shoppingList));
  }
}

export default ShoppingListImageController;
