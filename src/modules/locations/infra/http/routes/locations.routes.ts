import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import LocationsController from '@modules/locations/infra/http/controllers/LocationsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const locationsRouter = Router();
const locationsController = new LocationsController();

locationsRouter.use(ensureAuthenticated);

locationsRouter.get(
  '/findLocations',
  celebrate({
    [Segments.QUERY]: {
      shopping_list_id: Joi.string().required(),
      date: Joi.date().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      maxDistance: Joi.number().required(),
    },
  }),
  ensureAuthenticated,
  locationsController.index,
);

export default locationsRouter;
