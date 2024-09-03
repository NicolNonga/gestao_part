import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('emal')
      table.string('email')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
