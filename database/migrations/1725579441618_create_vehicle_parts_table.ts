import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vehicle_parts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('vehicle_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('vehicles')
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
