import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ShoppingListItemsController from '@modules/shoppingListItems/infra/http/controllers/ShoppingListItemsController';
import ShoppingListItemsByShoppingListIdController from '@modules/shoppingListItems/infra/http/controllers/ShoppingListItemsByShoppingListIdController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const shoppingListItemsRouter = Router();
const shoppingListItemsController = new ShoppingListItemsController();
const shoppingListItemsByShoppingListIdController = new ShoppingListItemsByShoppingListIdController();

shoppingListItemsRouter.use(ensureAuthenticated);

shoppingListItemsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().required(),
      shoppinglist_id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  shoppingListItemsController.create,
);

shoppingListItemsRouter.get(
  '/findByShoppingListId',
  celebrate({
    [Segments.BODY]: {
      shoppinglist_id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  shoppingListItemsByShoppingListIdController.index,
);

export default shoppingListItemsRouter;
