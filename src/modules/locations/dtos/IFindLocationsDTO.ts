interface IFindLocationsDTO {
  shopping_list_id: string;
  date: Date;
  latitude: number;
  longitude: number;
  maxDistance: number;
}

export default IFindLocationsDTO;
