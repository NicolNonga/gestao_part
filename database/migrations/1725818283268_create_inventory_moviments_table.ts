import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'inventory_moviments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('stock_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('stocks')
        .onDelete('CASCADE')
      table.enum('moviment_type', ['IN', 'OUT'])
      table.integer('quantity')
      table
        .integer('supplie_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('suppliers')
        .onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
