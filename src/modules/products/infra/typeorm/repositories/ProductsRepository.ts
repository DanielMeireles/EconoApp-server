import { getRepository, Repository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

import Product from '@modules/products/infra/typeorm/entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findAll(): Promise<Product[]> {
    const products = await this.ormRepository.find();

    return products;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);

    return product;
  }

  public async findByName(name: string): Promise<Product[]> {
    const products = await this.ormRepository.find({ where: { name } });

    return products;
  }

  public async findByDescription(description: string): Promise<Product[]> {
    const products = await this.ormRepository.find({
      where: { description },
    });

    return products;
  }

  public async create({
    name,
    description,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({ name, description });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }
}

export default ProductsRepository;
