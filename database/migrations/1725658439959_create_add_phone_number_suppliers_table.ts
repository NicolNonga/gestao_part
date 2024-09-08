import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'suppliers'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('phone_number').nullable().after('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
