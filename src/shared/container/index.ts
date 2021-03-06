import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import IShoppingListsRepository from '@modules/shoppingLists/repositories/IShoppingListsRepository';
import ShoppingListsRepository from '@modules/shoppingLists/infra/typeorm/repositories/ShoppingListsRepository';

import IShoppingListItemsRepository from '@modules/shoppingListItems/repositories/IShoppingListItemsRepository';
import ShoppingListItemsRepository from '@modules/shoppingListItems/infra/typeorm/repositories/ShoppingListItemsRepository';

import ILocationsRepository from '@modules/locations/repositories/ILocationsRepository';
import LocationsRepository from '@modules/locations/infra/typeorm/repositories/LocationsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IShoppingListsRepository>(
  'ShoppingListsRepository',
  ShoppingListsRepository,
);

container.registerSingleton<IShoppingListItemsRepository>(
  'ShoppingListItemsRepository',
  ShoppingListItemsRepository,
);

container.registerSingleton<ILocationsRepository>(
  'LocationsRepository',
  LocationsRepository,
);
