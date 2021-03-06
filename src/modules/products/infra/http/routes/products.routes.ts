import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ProductsController from '@modules/products/infra/http/controllers/ProductsController';
import ProductsByIdController from '@modules/products/infra/http/controllers/ProductsByIdController';
import ProductsByNameController from '@modules/products/infra/http/controllers/ProductsByNameController';
import ProductsByNameAndBrandController from '@modules/products/infra/http/controllers/ProductsByNameAndBrandController';
import ProductsByBrandController from '@modules/products/infra/http/controllers/ProductsByBrandController';
import ProductsByDescriptionController from '@modules/products/infra/http/controllers/ProductsByDescriptionController';
import ProductImageController from '@modules/products/infra/http/controllers/ProductImageController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const productsRouter = Router();
const productsController = new ProductsController();
const productsByIdController = new ProductsByIdController();
const productsByNameController = new ProductsByNameController();
const productsByNameAndBrandController = new ProductsByNameAndBrandController();
const productsByBrandController = new ProductsByBrandController();
const productsByDescriptionController = new ProductsByDescriptionController();
const productImageController = new ProductImageController();
const upload = multer(uploadConfig.multer);

productsRouter.use(ensureAuthenticated);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      brand: Joi.string(),
      description: Joi.string(),
    },
  }),
  ensureAuthenticated,
  productsController.create,
);

productsRouter.delete(
  '/',
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  productsController.delete,
);

productsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      name: Joi.string().required(),
      brand: Joi.string(),
      description: Joi.string(),
    },
  }),
  ensureAuthenticated,
  productsController.update,
);

productsRouter.patch(
  '/:id/image',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  upload.single('image'),
  productImageController.update,
);

productsRouter.get('/', ensureAuthenticated, productsController.index);

productsRouter.get(
  '/findById',
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  productsByIdController.index,
);

productsRouter.get(
  '/findByName',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  productsByNameController.index,
);

productsRouter.get(
  '/findByNameAndBrand',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().required(),
      brand: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  productsByNameAndBrandController.index,
);

productsRouter.get(
  '/findByBrand',
  celebrate({
    [Segments.QUERY]: {
      brand: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  productsByBrandController.index,
);

productsRouter.get(
  '/findByDescription',
  celebrate({
    [Segments.QUERY]: {
      description: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  productsByDescriptionController.index,
);

export default productsRouter;
