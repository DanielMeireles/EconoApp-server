import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ProductsController from '@modules/products/infra/http/controllers/ProductsController';
import ProductImageController from '@modules/products/infra/http/controllers/ProductImageController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const productsRouter = Router();
const productsController = new ProductsController();
const productImageController = new ProductImageController();
const upload = multer(uploadConfig.multer);

productsRouter.use(ensureAuthenticated);

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

productsRouter.patch(
  '/:product_id/image',
  celebrate({
    [Segments.PARAMS]: {
      product_id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  upload.single('image'),
  productImageController.update,
);

productsRouter.get('/', productsController.index);

export default productsRouter;
