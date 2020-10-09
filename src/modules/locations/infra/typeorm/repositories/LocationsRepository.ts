import { getConnection } from 'typeorm';

import AppError from '@shared/errors/AppError';

import ShoppingListItem from '@modules/shoppingListItems/infra/typeorm/entities/ShoppingListItem';
import Product from '@modules/products/infra/typeorm/entities/Product';

import ILocationsRepository from '@modules/locations/repositories/ILocationsRepository';
import IFindLocationsDTO from '@modules/locations/dtos/IFindLocationsDTO';
import ILocationDTO from '@modules/locations/dtos/ILocationDTO';

class LocationsRepository implements ILocationsRepository {
  public async findLocations({
    product_id,
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
        .addSelect('p.id', 'id')
        .addSelect('p.name', 'name')
        .addSelect('p.brand', 'brand')
        .addSelect('s.date', 'date')
        .addSelect('s.latitude', 'latitude')
        .addSelect('s.longitude', 'longitude')
        .addSelect('s.value', 'value')
        .from(ShoppingListItem, 's')
        .innerJoin(Product, 'p', 'p.id = s.product_id')
        .where('s.product_id = :product_id', { product_id })
        .andWhere('s.date between :startDate and :endDate', {
          startDate,
          endDate,
        })
        .andWhere('s.latitude between :minLatitude and :maxLatitude', {
          minLatitude,
          maxLatitude,
        })
        .andWhere('s.longitude between :minLongitude and :maxLongitude', {
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
