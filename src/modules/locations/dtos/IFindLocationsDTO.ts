interface IFindLocationsDTO {
  product_id: string;
  date: Date;
  latitude: number;
  longitude: number;
  maxDistance: number;
}

export default IFindLocationsDTO;
