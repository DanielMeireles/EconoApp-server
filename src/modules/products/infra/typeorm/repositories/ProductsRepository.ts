import { getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IDeleteProductDTO from '@modules/products/dtos/IDeleteProductDTO';
import IFindProductsByIdDTO from '@modules/products/dtos/IFindProductsByIdDTO';
import IFindProductsByNameDTO from '@modules/products/dtos/IFindProductsByNameDTO';
import IFindProductsByBrandDTO from '@modules/products/dtos/IFindProductsByBrandDTO';
import IFindProductsByNameAndBrandDTO from '@modules/products/dtos/IFindProductsByNameAndBrandDTO';
import IFindProductsByDescriptionDTO from '@modules/products/dtos/IFindProductsByDescriptionDTO';

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

  public async findById({
    id,
  }: IFindProductsByIdDTO): Promise<Product | undefined> {
    try {
      const product = await this.ormRepository.findOne(id);

      return product;
    } catch {
      throw new AppError('Products not found');
    }
  }

  public async findByName({
    name,
  }: IFindProductsByNameDTO): Promise<Product[]> {
    const products = await this.ormRepository.find({ where: { name } });

    return products;
  }

  public async findByBrand({
    brand,
  }: IFindProductsByBrandDTO): Promise<Product[]> {
    const products = await this.ormRepository.find({
      where: { brand },
    });

    return products;
  }

  public async findByNameAndBrand({
    name,
    brand,
  }: IFindProductsByNameAndBrandDTO): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { name, brand },
    });

    return product;
  }

  public async findByDescription({
    description,
  }: IFindProductsByDescriptionDTO): Promise<Product[]> {
    const products = await this.ormRepository.find({
      where: { description },
    });

    return products;
  }

  public async create({
    name,
    brand,
    description,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({ name, brand, description });

    await this.ormRepository.save(product);

    return product;
  }

  public async delete({ id }: IDeleteProductDTO): Promise<void> {
    try {
      await this.ormRepository.delete(id);
    } catch {
      throw new AppError('Failure to delete the product');
    }
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }
}

export default ProductsRepository;
