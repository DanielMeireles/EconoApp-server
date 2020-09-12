import { uuid } from 'uuidv4';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

import Product from '@modules/products/infra/typeorm/entities/Product';

class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async findAll(): Promise<Product[]> {
    return this.products;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const findProduct = this.products.find(product => product.id === id);

    return findProduct;
  }

  public async findByName(name: string): Promise<Product[]> {
    const findProducts: Product[] = [];

    const findProduct = this.products.find(product => product.name === name);

    if (findProduct) {
      findProducts.push(findProduct);
    }

    return findProducts;
  }

  public async findByDescription(description: string): Promise<Product[]> {
    const findProducts: Product[] = [];

    const findProduct = this.products.find(
      product => product.description === description,
    );

    if (findProduct) {
      findProducts.push(findProduct);
    }

    return findProducts;
  }

  public async create({
    name,
    description,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, { id: uuid(), name, description });

    this.products.push(product);

    return product;
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
