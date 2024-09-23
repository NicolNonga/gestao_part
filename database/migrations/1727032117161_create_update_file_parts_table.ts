import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'parts'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('file_name').nullable()
      table.dropColumn('fileName')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
