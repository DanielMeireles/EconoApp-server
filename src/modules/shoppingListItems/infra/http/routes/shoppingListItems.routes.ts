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

shoppingListItemsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      date: Joi.date(),
      product_id: Joi.string().required(),
      shoppinglist_id: Joi.string().required(),
      checked: Joi.boolean(),
      quantity: Joi.number(),
      value: Joi.number(),
      longitude: Joi.number(),
      latitude: Joi.number(),
    },
  }),
  ensureAuthenticated,
  shoppingListItemsController.update,
);

shoppingListItemsRouter.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  shoppingListItemsController.delete,
);

shoppingListItemsRouter.get(
  '/findByShoppingListId/:shoppinglist_id',
  celebrate({
    [Segments.PARAMS]: {
      shoppinglist_id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  shoppingListItemsByShoppingListIdController.index,
);

export default shoppingListItemsRouter;
