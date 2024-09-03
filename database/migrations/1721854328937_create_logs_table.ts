import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("user").nullable()
      table.string("app_nome").nullable()
      table.datetime("started").nullable()
      table.dateTime("ended").nullable()
      table.integer("stay_open_during").nullable();
      table.text("mac_adress").nullable();
      table.text("ip").nullable();
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}