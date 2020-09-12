import Product from '@modules/products/infra/typeorm/entities/Product';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

interface IProductsRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  findByDescription(description: string): Promise<Product | undefined>;
  create(data: ICreateProductDTO): Promise<Product>;
  save(product: Product): Promise<Product>;
}

export default IProductsRepository;
