import Product from '@modules/products/infra/typeorm/entities/Product';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IFindProductsByIdDTO from '@modules/products/dtos/IFindProductsByIdDTO';
import IFindProductsByNameDTO from '@modules/products/dtos/IFindProductsByNameDTO';
import IFindProductsByDescriptionDTO from '@modules/products/dtos/IFindProductsByDescriptionDTO';

interface IProductsRepository {
  findAll(): Promise<Product[]>;
  findById(data: IFindProductsByIdDTO): Promise<Product | undefined>;
  findByName(data: IFindProductsByNameDTO): Promise<Product[]>;
  findByDescription(data: IFindProductsByDescriptionDTO): Promise<Product[]>;
  create(data: ICreateProductDTO): Promise<Product>;
  save(product: Product): Promise<Product>;
}

export default IProductsRepository;
