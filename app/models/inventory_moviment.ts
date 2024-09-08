import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class InventoryMoviment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare stockId: number
  @column()
  declare moviment_type: string
  @column()
  declare supplieId: number
  @column()
  declare quantity: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
