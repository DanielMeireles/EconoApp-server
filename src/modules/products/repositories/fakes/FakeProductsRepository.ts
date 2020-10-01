import { uuid } from 'uuidv4';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IDeleteProductDTO from '@modules/products/dtos/IDeleteProductDTO';
import IFindProductsByIdDTO from '@modules/products/dtos/IFindProductsByIdDTO';
import IFindProductsByNameDTO from '@modules/products/dtos/IFindProductsByNameDTO';
import IFindProductsByBrandDTO from '@modules/products/dtos/IFindProductsByBrandDTO';
import IFindProductsByNameAndBrandDTO from '@modules/products/dtos/IFindProductsByNameAndBrandDTO';
import IFindProductsByDescriptionDTO from '@modules/products/dtos/IFindProductsByDescriptionDTO';

import Product from '@modules/products/infra/typeorm/entities/Product';

class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async findAll(): Promise<Product[]> {
    return this.products;
  }

  public async findById({
    id,
  }: IFindProductsByIdDTO): Promise<Product | undefined> {
    const findProduct = this.products.find(product => product.id === id);

    return findProduct;
  }

  public async findByName({
    name,
  }: IFindProductsByNameDTO): Promise<Product[]> {
    const findProducts = this.products.filter(product => product.name === name);

    return findProducts;
  }

  public async findByBrand({
    brand,
  }: IFindProductsByBrandDTO): Promise<Product[]> {
    const findProducts = this.products.filter(
      product => product.brand === brand,
    );

    return findProducts;
  }

  public async findByNameAndBrand({
    name,
    brand,
  }: IFindProductsByNameAndBrandDTO): Promise<Product | undefined> {
    const findProduct = this.products.find(
      product => product.name === name && product.brand === brand,
    );

    return findProduct;
  }

  public async findByDescription({
    description,
  }: IFindProductsByDescriptionDTO): Promise<Product[]> {
    const findProducts = this.products.filter(
      product => product.description === description,
    );

    return findProducts;
  }

  public async create({
    name,
    brand,
    description,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, { id: uuid(), name, brand, description });

    this.products.push(product);

    return product;
  }

  public async delete({ id }: IDeleteProductDTO): Promise<void> {
    const findIndex = this.products.findIndex(
      findProduct => findProduct.id === id,
    );

    this.products.splice(findIndex);
  }

  public async save(product: Product): Promise<Product> {
    const findIndex = this.products.findIndex(
      findProduct => findProduct.id === product.id,
    );

    this.products[findIndex] = product;

    return product;
  }
}

export default FakeProductsRepository;
