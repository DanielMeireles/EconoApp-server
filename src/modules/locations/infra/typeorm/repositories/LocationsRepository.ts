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
      const locations: ILocationDTO[] = await getConnection()
        .createQueryBuilder()
        .addSelect('p.id', 'id')
        .addSelect('p.name', 'name')
        .addSelect('p.brand', 'brand')
        .addSelect('s.date', 'date')
        .addSelect('s.latitude', 'latitude')
        .addSelect('s.longitude', 'longitude')
        .addSelect('s.value', 'values')
        .from(ShoppingListItem, 's')
        .innerJoin(Product, 'p', 'p.id = s.product_id')
        .where('s.product_id = :product_id', { product_id })
        .andWhere('s.date = :date', { date })
        .andWhere(
          's.latitude between (:latitude - :maxDistance) and (:latitude + :maxDistance)',
          { latitude, maxDistance },
        )
        .andWhere(
          's.longitude between (:longitude - :maxDistance) and (:longitude + :maxDistance)',
          { longitude, maxDistance },
        )
        .getRawMany();

      return locations;
    } catch {
      throw new AppError('Not found locations for this product');
    }
  }
}

export default LocationsRepository;
