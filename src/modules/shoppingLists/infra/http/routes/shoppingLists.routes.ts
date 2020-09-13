import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ShoppingListsController from '@modules/shoppingLists/infra/http/controllers/ShoppingListsController';
import ShoppingListsByIdController from '@modules/shoppingLists/infra/http/controllers/ShoppingListsByIdController';
import ShoppingListsByNameController from '@modules/shoppingLists/infra/http/controllers/ShoppingListsByNameController';
import ShoppingListsByDescriptionController from '@modules/shoppingLists/infra/http/controllers/ShoppingListsByDescriptionController';
import ShoppingListsByDateController from '@modules/shoppingLists/infra/http/controllers/ShoppingListsByDateController';
import ShoppingListImageController from '@modules/shoppingLists/infra/http/controllers/ShoppingListImageController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const shoppingListsRouter = Router();
const shoppingListsController = new ShoppingListsController();
const shoppingListsByIdController = new ShoppingListsByIdController();
const shoppingListsByNameController = new ShoppingListsByNameController();
const shoppingListsByDescriptionController = new ShoppingListsByDescriptionController();
const shoppingListsByDateController = new ShoppingListsByDateController();
const shoppingListImageController = new ShoppingListImageController();
const upload = multer(uploadConfig.multer);

shoppingListsRouter.use(ensureAuthenticated);

shoppingListsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  shoppingListsController.create,
);

shoppingListsRouter.patch(
  '/:id/image',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  upload.single('image'),
  shoppingListImageController.update,
);

shoppingListsRouter.get(
  '/',
  ensureAuthenticated,
  shoppingListsController.index,
);

shoppingListsRouter.get(
  '/findById/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  shoppingListsByIdController.index,
);

shoppingListsRouter.get(
  '/findByName/:name',
  celebrate({
    [Segments.PARAMS]: {
      name: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  shoppingListsByNameController.index,
);

shoppingListsRouter.get(
  '/findByDescription/:description',
  celebrate({
    [Segments.PARAMS]: {
      description: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  shoppingListsByDescriptionController.index,
);

shoppingListsRouter.get(
  '/findByDescription/:date',
  celebrate({
    [Segments.PARAMS]: {
      date: Joi.date().required(),
    },
  }),
  ensureAuthenticated,
  shoppingListsByDateController.index,
);

export default shoppingListsRouter;
