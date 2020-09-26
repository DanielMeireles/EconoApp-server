import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ShoppingListItem from '@modules/shoppingListItems/infra/typeorm/entities/ShoppingListItem';
import IShoppingListItemsRepository from '@modules/shoppingListItems/repositories/IShoppingListItemsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IUpdateShoppingListItemDTO from '@modules/shoppingListItems/dtos/IUpdateShoppingListItemDTO';

@injectable()
class UpdateShoppingListItemService {
  constructor(
    @inject('ShoppingListItemsRepository')
    private shoppingListItemsRepository: IShoppingListItemsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    date,
    product_id,
    shoppinglist_id,
    checked,
    quantity,
    value,
    longitude,
    latitude,
  }: IUpdateShoppingListItemDTO): Promise<ShoppingListItem> {
    const shoppingListItem = await this.shoppingListItemsRepository.findById({
      id,
    });

    if (!shoppingListItem) {
      throw new AppError('Shopping List Item not found');
    }

    Object.assign(shoppingListItem, {
      id,
      date,
      product_id,
      shoppinglist_id,
      checked,
      quantity,
      value,
      longitude,
      latitude,
    });

    await this.shoppingListItemsRepository.save(shoppingListItem);

    await this.cacheProvider.invalidate(
      `shopping-lists-item:${shoppinglist_id}`,
    );

    return shoppingListItem;
  }
}

export default UpdateShoppingListItemService;
