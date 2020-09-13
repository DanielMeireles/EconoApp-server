import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateShoppingListImageService from '@modules/shoppingLists/services/UpdateShoppingListImageService';

class ShoppingListImageController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateShoppingListImage = container.resolve(
      UpdateShoppingListImageService,
    );

    const shoppingList = await updateShoppingListImage.execute({
      user_id: req.user.id,
      id: req.params.id,
      imageFilename: req.file.filename,
    });

    return res.json(classToClass(shoppingList));
  }
}

export default ShoppingListImageController;
