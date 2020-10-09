import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ILocationsRepository from '@modules/locations/repositories/ILocationsRepository';

import IFindLocationsDTO from '@modules/locations/dtos/IFindLocationsDTO';
import ILocationDTO from '@modules/locations/dtos/ILocationDTO';

@injectable()
class ListLocationsService {
  constructor(
    @inject('LocationsRepository')
    private locationsRepository: ILocationsRepository,
  ) {}

  public async execute({
    shopping_list_id,
    date,
    latitude,
    longitude,
    maxDistance,
  }: IFindLocationsDTO): Promise<ILocationDTO[]> {
    const locations = await this.locationsRepository.findLocations({
      shopping_list_id,
      date,
      latitude,
      longitude,
      maxDistance,
    });

    return locations;
  }
}

export default ListLocationsService;
