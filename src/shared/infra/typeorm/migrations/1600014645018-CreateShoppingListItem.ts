import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateShoppingListItem1600014645018
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'shoppinglistitems',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'product_id',
            type: 'uuid',
          },
          {
            name: 'shoppinglist_id',
            type: 'uuid',
          },
          {
            name: 'checked',
            type: 'boolean',
            default: 'false',
          },
          {
            name: 'quantity',
            type: 'double precision',
            isNullable: true,
          },
          {
            name: 'value',
            type: 'double precision',
            isNullable: true,
          },
          {
            name: 'longitude',
            type: 'double precision',
            isNullable: true,
          },
          {
            name: 'latitude',
            type: 'double precision',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'shoppinglistitems',
      new TableForeignKey({
        name: 'ShoppingListItemShoppingList',
        columnNames: ['shoppinglist_id'],
        referencedTableName: 'shoppinglists',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'shoppinglistitems',
      new TableForeignKey({
        name: 'ShoppingListItemProduct',
        columnNames: ['product_id'],
        referencedTableName: 'products',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'shoppinglistitems',
      'ShoppingListItemShoppingList',
    );
    await queryRunner.dropForeignKey(
      'shoppinglistitems',
      'ShoppingListItemProduct',
    );
    await queryRunner.dropTable('shoppinglistitems');
  }
}
