import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import ShoppingList from '@modules/shoppingLists/infra/typeorm/entities/ShoppingList';
import Product from '@modules/products/infra/typeorm/entities/Product';

@Entity('shoppinglistitems')
class ShoppingListItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp with time zone')
  date: Date;

  @Column()
  product_id: string;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  shoppinglist_id: string;

  @ManyToOne(() => ShoppingList)
  @JoinColumn({ name: 'shoppinglist_id' })
  shoppingList: ShoppingList;

  @Column()
  quantity: number;

  @Column()
  value: number;

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ShoppingListItem;
