import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListLocations from '@modules/locations/services/ListLocationsService';

class LocationsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listLocations = container.resolve(ListLocations);

    const locations = await listLocations.execute({
      product_id: request.query.shoppinglist_id as string,
      date: (request.query.date as unknown) as Date,
      latitude: (request.query.latitude as unknown) as number,
      longitude: (request.query.longitude as unknown) as number,
      maxDistance: (request.query.maxDistance as unknown) as number,
    });

    return response.json(locations);
  }
}

export default LocationsController;
