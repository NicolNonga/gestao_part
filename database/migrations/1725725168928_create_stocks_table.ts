import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'stocks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('quantity').notNullable()
      table
        .integer('part_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('parts')
        .onDelete('CASCADE')
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
