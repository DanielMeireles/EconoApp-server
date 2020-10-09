import { getConnection } from 'typeorm';

import AppError from '@shared/errors/AppError';

import ShoppingListItem from '@modules/shoppingListItems/infra/typeorm/entities/ShoppingListItem';
import Product from '@modules/products/infra/typeorm/entities/Product';

import ILocationsRepository from '@modules/locations/repositories/ILocationsRepository';
import IFindLocationsDTO from '@modules/locations/dtos/IFindLocationsDTO';
import ILocationDTO from '@modules/locations/dtos/ILocationDTO';

class LocationsRepository implements ILocationsRepository {
  public async findLocations({
    shopping_list_id,
    date,
    latitude,
    longitude,
    maxDistance,
  }: IFindLocationsDTO): Promise<ILocationDTO[]> {
    try {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 2);

      const minLatitude = latitude - maxDistance;
      const maxLatitude = latitude + maxDistance;

      const minLongitude = longitude - maxDistance;
      const maxLongitude = longitude + maxDistance;

      const locations: ILocationDTO[] = await getConnection()
        .createQueryBuilder()
        .distinct()
        .addSelect('p.id', 'id')
        .addSelect('p.name', 'name')
        .addSelect('p.brand', 'brand')
        .addSelect('s_aux.date', 'date')
        .addSelect('s_aux.latitude', 'latitude')
        .addSelect('s_aux.longitude', 'longitude')
        .addSelect('s_aux.value', 'value')
        .from(ShoppingListItem, 's')
        .innerJoin(ShoppingListItem, 's_aux', 's_aux.product_id = s.product_id')
        .innerJoin(Product, 'p', 'p.id = s.product_id')
        .where('s.shoppinglist_id = :shopping_list_id', { shopping_list_id })
        .andWhere('s_aux.date between :startDate and :endDate', {
          startDate,
          endDate,
        })
        .andWhere('s_aux.latitude between :minLatitude and :maxLatitude', {
          minLatitude,
          maxLatitude,
        })
        .andWhere('s_aux.longitude between :minLongitude and :maxLongitude', {
          minLongitude,
          maxLongitude,
        })
        .getRawMany();

      return locations;
    } catch {
      throw new AppError('Not found locations for this product');
    }
  }
}

export default LocationsRepository;
