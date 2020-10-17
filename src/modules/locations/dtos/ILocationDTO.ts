interface IProduct {
  id: string;
  name: string;
  brand: string;
  value: number;
}

interface ILocationDTO {
  date: Date;
  latitude: number;
  longitude: number;
  products: IProduct[];
}

export default ILocationDTO;
