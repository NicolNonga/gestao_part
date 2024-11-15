import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'payments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.decimal('amount', 10, 2).notNullable()
      table.boolean('status').defaultTo(1)
      table
        .integer('client_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('clients')
        .onDelete('CASCADE')

      table
        .integer('payment_method_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('payment_methods')
        .onDelete('CASCADE')

      table
        .integer('part_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('parts')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
