import FakeLocationsRepository from '@modules/locations/repositories/fakes/FakeLocationsRepository';
import ListLocationsService from '@modules/locations/services/ListLocationsService';
import ILocationDTO from '@modules/locations/dtos/ILocationDTO';

let fakeLocationsRepository: FakeLocationsRepository;
let listLocations: ListLocationsService;

describe('ListLocations', () => {
  beforeEach(() => {
    fakeLocationsRepository = new FakeLocationsRepository();

    listLocations = new ListLocationsService(fakeLocationsRepository);
  });

  it('should be able to list locations', async () => {
    const date = new Date();

    const location = await fakeLocationsRepository.create({
      date,
      latitude: 0.001,
      longitude: 0.001,
      products: [
        {
          name: 'Name 1',
          brand: 'Brand 1',
          value: 10.0,
        },
      ],
    } as ILocationDTO);

    await fakeLocationsRepository.create({
      date,
      latitude: 100.001,
      longitude: 100.001,
      products: [{ name: 'Name 1', brand: 'Brand 1', value: 10.0 }],
    } as ILocationDTO);

    const locations = await listLocations.execute({
      shopping_list_id: location.products[0].id,
      date,
      latitude: location.latitude,
      longitude: location.longitude,
      maxDistance: 10,
    });

    expect(locations[0].products[0].id).toEqual(location.products[0].id);
  });
});
