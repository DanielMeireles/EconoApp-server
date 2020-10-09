import { uuid } from 'uuidv4';

import ILocationsRepository from '@modules/locations/repositories/ILocationsRepository';
import IFindLocationsDTO from '@modules/locations/dtos/IFindLocationsDTO';
import ILocationDTO from '@modules/locations/dtos/ILocationDTO';

class FakeLocationsRepository implements ILocationsRepository {
  private locations: ILocationDTO[] = [];

  public async findLocations({
    shopping_list_id,
    date,
    latitude,
    longitude,
    maxDistance,
  }: IFindLocationsDTO): Promise<ILocationDTO[]> {
    const findLocations = this.locations.filter(
      location =>
        location.id === shopping_list_id &&
        location.date === date &&
        location.latitude >= latitude - maxDistance &&
        location.latitude <= latitude + maxDistance &&
        location.longitude >= longitude - maxDistance &&
        location.longitude <= longitude + maxDistance,
    );

    return findLocations;
  }

  public async create({
    name,
    brand,
    date,
    latitude,
    longitude,
    value,
  }: ILocationDTO): Promise<ILocationDTO> {
    const location = {} as ILocationDTO;

    Object.assign(location, {
      id: uuid(),
      name,
      brand,
      date,
      latitude,
      longitude,
      value,
    });

    this.locations.push(location);

    return location;
  }
}

export default FakeLocationsRepository;
