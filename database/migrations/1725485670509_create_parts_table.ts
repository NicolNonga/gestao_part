import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'parts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome')
      table.text('description')
      table.string('reference')
      table.integer('price').nullable().defaultTo(0)
      table
        .integer('type_part_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('type_parts')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
