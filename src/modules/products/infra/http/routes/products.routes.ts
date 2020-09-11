import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProductsController from '@modules/products/infra/http/controllers/ProductsController';

import ensureAuthenticade from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.use(ensureAuthenticade);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  productsController.create,
);

export default productsRouter;
