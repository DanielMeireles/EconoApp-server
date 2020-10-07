import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordsRouter from '@modules/users/infra/http/routes/passwords.routes';
import profilesRouter from '@modules/users/infra/http/routes/profiles.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import shoppingListsRouter from '@modules/shoppingLists/infra/http/routes/shoppingLists.routes';
import shoppingListItemsRouter from '@modules/shoppingListItems/infra/http/routes/shoppingListItems.routes';
import locationsRouter from '@modules/locations/infra/http/routes/locations.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordsRouter);
routes.use('/profile', profilesRouter);
routes.use('/products', productsRouter);
routes.use('/shoppinglists', shoppingListsRouter);
routes.use('/shoppinglistitems', shoppingListItemsRouter);
routes.use('/locations', locationsRouter);

export default routes;
