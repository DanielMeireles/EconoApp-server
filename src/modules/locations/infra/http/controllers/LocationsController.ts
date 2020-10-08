import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListLocations from '@modules/locations/services/ListLocationsService';

interface IRequest extends Request {
  query: {
    product_id: string;
    date: string;
    latitude: string;
    longitude: string;
    maxDistance: string;
  };
}

class LocationsController {
  public async index(request: IRequest, response: Response): Promise<Response> {
    const listLocations = container.resolve(ListLocations);

    const locations = await listLocations.execute({
      product_id: request.query.product_id,
      date: new Date(request.query.date),
      latitude: Number(request.query.latitude),
      longitude: Number(request.query.longitude),
      maxDistance: Number(request.query.maxDistance),
    });

    return response.json(locations);
  }
}

export default LocationsController;
