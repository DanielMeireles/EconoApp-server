import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ProductsController from '@modules/products/infra/http/controllers/ProductsController';
import ProductsByIdController from '@modules/products/infra/http/controllers/ProductsByIdController';
import ProductsByNameController from '@modules/products/infra/http/controllers/ProductsByNameController';
import ProductsByDescriptionController from '@modules/products/infra/http/controllers/ProductsByDescriptionController';
import ProductImageController from '@modules/products/infra/http/controllers/ProductImageController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const productsRouter = Router();
const productsController = new ProductsController();
const productsByIdController = new ProductsByIdController();
const productsByNameController = new ProductsByNameController();
const productsByDescriptionController = new ProductsByDescriptionController();
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

productsRouter.get('/', ensureAuthenticated, productsController.index);

productsRouter.get(
  '/findById/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  productsByIdController.index,
);

productsRouter.get(
  '/findByName/:name',
  celebrate({
    [Segments.PARAMS]: {
      name: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  productsByNameController.index,
);

productsRouter.get(
  '/findByDescription/:description',
  celebrate({
    [Segments.PARAMS]: {
      description: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  productsByDescriptionController.index,
);

export default productsRouter;
