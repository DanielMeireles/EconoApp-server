import ILocationDTO from '@modules/locations/dtos/ILocationDTO';
import IFindLocationsDTO from '@modules/locations/dtos/IFindLocationsDTO';

interface ILocationsRepository {
  findLocations(data: IFindLocationsDTO): Promise<ILocationDTO[]>;
}

export default ILocationsRepository;
